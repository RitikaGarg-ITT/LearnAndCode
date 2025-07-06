import mysql, { Pool, PoolOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "news_aggregator",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool: Pool = mysql.createPool(poolOptions);

export default pool.promise();
