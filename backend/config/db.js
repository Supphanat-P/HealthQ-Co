import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "healthq",
  password: "healthq",
  database: "healthq",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

export default db;
