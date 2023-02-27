import { DataSource, DataSourceOptions } from 'typeorm';
import { init1676931828495 } from 'database/migrations/1676931828495-init';
import 'dotenv/config';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: +process.env.POSTGRES_CONTAINER_PORT,
  host: process.env.POSTGRES_HOST,
  entities: ['dist/**/*.entity.js'],
  migrations: [init1676931828495],
};

const dataSource = new DataSource(ormConfig);

export default dataSource;
