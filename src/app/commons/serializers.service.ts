import { PersonsEntity } from '../persons/entities/persons.entity';
import { UserEntity } from '../users/entities/users.entity';

export const personSerialize = (data: PersonsEntity) => {
  delete data.location.id;
  delete data.origin.id;
  return { ...data, episodes: data.episodes.map((item) => item.url) };
};

export const userSerializer = (user: UserEntity) => {
  const { password, createdAt, ...result } = user;
  return result;
};
