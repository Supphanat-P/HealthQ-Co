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
  const sql = `
    SELECT * FROM doctors 
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    `;
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
  const sql = `
  SELECT * FROM appointments 
  JOIN doctors ON appointments.doctor_id = doctors.doctor_id
  JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
  JOIN specialties ON doctors.specialty_id = specialties.specialty_id
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ appointments: results });
  });
});

dataRouter.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: results });
  });
});

dataRouter.get("/users_info", (req, res) => {
  const sql = "SELECT * FROM users_info";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: results });
  });
});

dataRouter.get("/symptoms_list", (req, res) => {
  const sql = "SELECT * FROM symptoms";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ symptoms: results });
  });
});

export default dataRouter;
