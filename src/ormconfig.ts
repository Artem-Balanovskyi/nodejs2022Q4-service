import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: +process.env.POSTGRES_CONTAINER_PORT,
  host: process.env.POSTGRES_HOST,
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migrations',
  parseInt8: true,
  migrationsRun: true,
  logging: true,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
};

export default new DataSource(ormConfig);

export const database = registerAs(
  'database',
  (): PostgresConnectionOptions => ormConfig,
);
