import { DataSource, DataSourceOptions } from 'typeorm'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: `${process.env.DATABASE_NAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  username: `${process.env.DATABASE_USERNAME}`,
  host: `${process.env.DATABASE_HOST}`,
  port: parseInt(process.env.DATABASE_PORT, 10),
  migrations: ['dist/database/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  synchronize: false  
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource