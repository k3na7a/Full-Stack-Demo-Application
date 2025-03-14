import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { AvatarEntity } from 'src/app/modules/users/entities/avatar.entity';
import { ProfileEntity } from 'src/app/modules/users/entities/profile.entity';
import { UserEntity } from 'src/app/modules/users/entities/user.entity';

const entities = [
  // # users
  UserEntity,
  ProfileEntity,
  AvatarEntity,
];

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities,
  synchronize: true,
  timezone: 'Z',
};

// const config: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'password',
//   database: 'demo_nest_api',
//   entities,
//   synchronize: true,
//   timezone: 'Z',
// };

export class TypeOrmPlugin {
  public static forRoot = TypeOrmModule.forRoot(config);
  public static forFeature = (entities: EntityClassOrSchema[]) =>
    TypeOrmModule.forFeature(entities);
}
