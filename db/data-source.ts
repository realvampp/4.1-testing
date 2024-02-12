import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv';
import * as process from 'process'
import { SeederOptions } from 'typeorm-extension'

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],

  seeds: ['dist/db/seeds/**/*.js'],
  seedTracking: false,
  factories: ['dist/db/factories/**/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource