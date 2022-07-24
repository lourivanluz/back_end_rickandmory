import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configDB: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [__dirname + 'src/app/**/entities/*.entity{.js,.ts}'],
};
