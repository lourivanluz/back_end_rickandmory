import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'http';
import {
  FindConditions,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';
import {
  personSerialize,
  userSerializer,
} from '../commons/serializers.service';
import { PersonsEntity } from '../persons/entities/persons.entity';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['favorites'],
    });
    return users;
  }

  async findFavorites(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['favorites'],
    });
    if (!user) throw new NotFoundException('Usuario não encontrado');
    if (user.favorites) {
      const favoritesNames = user.favorites.map((item) => item.name);
      const result = [];
      for (const name of favoritesNames) {
        const personRepo = getRepository(PersonsEntity);
        result.push(
          personSerialize(
            await personRepo.findOne(
              { name: name },
              { relations: ['origin', 'location', 'episodes'] },
            ),
          ),
        );
      }

      return result;
    }
    return user;
  }

  async findOneOrFail(conditions: FindConditions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(conditions);
    } catch (error) {
      throw new NotFoundException('Usuario não encontrado');
    }
  }

  async createUser(data: UserDtoCreate) {
    const user = this.userRepository.create(data);
    try {
      return userSerializer(await this.userRepository.save(user));
    } catch (error) {
      throw new ConflictException('Usuario ja existe');
    }
  }

  async update(id: string, data: UserDtoUpdate) {
    const user = await this.findOneOrFail({ id });
    if (!data.email && !data.name) {
      throw new BadRequestException('campo email ou name obrigatorio');
    }
    this.userRepository.merge(user, data);
    return userSerializer(await this.userRepository.save(user));
  }

  async delete(id: string) {
    const user = await this.findOneOrFail({ id });
    this.userRepository.delete(user.id);
  }

  async bindUserPerson(id: string, body: PersonsEntity[]) {
    const user = await this.findOneOrFail({ id });
    user.favorites = body;
    return await this.userRepository.save(user);
  }
}
