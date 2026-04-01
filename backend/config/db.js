import { Connection } from "mysql2";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "rootpassword",
  database: "healthq",
});

export default db;
