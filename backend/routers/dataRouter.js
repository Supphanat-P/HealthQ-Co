import { Router } from "express";
import mysql from "mysql2";
import db from '../config/db.js';

const dataRouter = Router();

dataRouter.get("/doctors", (req, res) => {
  const sql = `
    SELECT * FROM doctors 
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    `;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ doctors: results });
  });
});

dataRouter.get("/hospitals", (req, res) => {
  const sql = "SELECT * FROM hospitals";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ hospitals: results });
  });
});

dataRouter.get("/specialties", (req, res) => {
  const sql = "SELECT * FROM specialties";
  db.query(sql, (err, results) => {
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
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ appointments: results });
  });
});

dataRouter.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: results });
  });
});

dataRouter.get("/users_info", (req, res) => {
  const sql = "SELECT * FROM users_info";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: results });
  });
});

dataRouter.get("/symptoms_list", (req, res) => {
  const sql = "SELECT * FROM symptoms";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ symptoms: results });
  });
});

export default dataRouter;
