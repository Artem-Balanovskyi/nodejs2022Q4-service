import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: +process.env.POSTGRES_CONTAINER_PORT,
  host: process.env.POSTGRES_HOST,
  logging: true,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
};

const dataSource = new DataSource(ormConfig);

export default dataSource;
