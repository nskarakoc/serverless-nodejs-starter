import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Config } from './util/config';

export const AppDataSource = new DataSource({
  database: 'sample_schema',
  entities: [`${__dirname}/domains/sample-domain/typeorm/*.[t|j]s`],
  host: Config.getEnv('MYSQL_HOST'),
  logging: true,
  migrations: [`${__dirname}/migrations/*.ts`],
  namingStrategy: new SnakeNamingStrategy(),
  password: Config.getEnv('MYSQL_PASSWORD'),
  synchronize: false,
  type: 'mysql',
  timezone: 'Z',
  username: Config.getEnv('MYSQL_USERNAME'),
});
