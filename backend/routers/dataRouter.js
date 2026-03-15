import { Router } from "express";
import mysql from "mysql2";

const dataRouter = Router();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "healthq",
  password: "healthq",
  database: "healthq",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

dataRouter.get("/doctors", (req, res) => {
  const sql = "SELECT * FROM doctors";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ doctors: results });
  });
});

dataRouter.get("/hospitals", (req, res) => {
  const sql = "SELECT * FROM hospitals";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ hospitals: results });
  });
});

dataRouter.get("/specialties", (req, res) => {
  const sql = "SELECT * FROM specialties";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ specialties: results });
  });
});

dataRouter.get("/appointments", (req, res) => {
  const sql = "SELECT * FROM appointments";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ appointments: results });
  });
});

export default dataRouter;
