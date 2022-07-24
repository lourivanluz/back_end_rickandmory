import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { getRepository } from 'typeorm';
import { EpisodesEntity } from '../persons/entities/episode.entity';

export const findOrCreateEpisodes = async (episodes: string[]) => {
  const generic = await Promise.all(
    episodes.map(async (item) => {
      const episodeRepo = getRepository(EpisodesEntity);
      const result = await episodeRepo.findOne({ where: { url: item } });
      if (!result) {
        return await episodeRepo.save(episodeRepo.create({ url: item }));
      }
      return result;
    }),
  );
  return generic;
};

export const findOrCreateGenerics = async (
  data,
  entity: EntityClassOrSchema,
) => {
  const genericRepo = getRepository(entity);
  const result = await genericRepo.findOne({ url: data.url });
  if (!result) {
    return await genericRepo.save(genericRepo.create(data));
  }
  return result;
};
