import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({ select: ['id', 'name', 'email'] });
  }

  async findOneOrFail(
    conditions: FindConditions<UserEntity>,
    options?: FindOneOptions<UserEntity>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(conditions);
    } catch (error) {
      throw new NotFoundException(error.error);
    }
  }

  async createUser(data: UserDtoCreate) {
    const user = this.userRepository.create(data);
    try {
      return this.serializer(await this.userRepository.save(user));
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
    return this.serializer(await this.userRepository.save(user));
  }

  async delete(id: string) {
    const user = await this.findOneOrFail({ id });
    this.userRepository.delete(user.id);
  }

  serializer(user: UserEntity) {
    const { password, createdAt, ...result } = user;
    return result;
  }
}
