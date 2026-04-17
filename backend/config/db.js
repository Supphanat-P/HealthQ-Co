import { Connection } from "mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER || "healthq",
  password: process.env.DB_PASS || "healthq",
  database: process.env.DB_DATA || "healthq",
});

export default db;
