import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  dbHost: process.env.DB_HOST,
  dbPort: +process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};
