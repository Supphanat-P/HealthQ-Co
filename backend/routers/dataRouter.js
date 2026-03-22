import { Router } from "express";
import db from "../config/db.js";

const dataRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management APIs
 */

/**
 * @swagger
 * /data/doctors:
 *   get:
 *     summary: Get all doctors with specialties and hospitals
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of doctors
 *       500:
 *         description: Server error
 */
dataRouter.get("/doctors", (req, res) => {
  const sql = `
    SELECT * FROM doctors 
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /data/hospitals:
 *   get:
 *     summary: Get all hospitals
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of hospitals
 */
dataRouter.get("/hospitals", (req, res) => {
  const sql = "SELECT * FROM hospitals";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/**
 * @swagger
 * /data/specialties:
 *   get:
 *     summary: Get all specialties
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of specialties
 */
dataRouter.get("/specialties", (req, res) => {
  const sql = "SELECT * FROM specialties";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/**
 * @swagger
 * /data/appointments:
 *   get:
 *     summary: Get all appointments with doctor, hospital, and specialty
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of appointments
 */
dataRouter.get("/appointments", (req, res) => {
  const sql = `
    SELECT * FROM appointments 
    JOIN doctors ON appointments.doctor_id = doctors.doctor_id
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/**
 * @swagger
 * /data/users:
 *   get:
 *     summary: Get all users
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of users
 */
dataRouter.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/**
 * @swagger
 * /data/users_info:
 *   get:
 *     summary: Get all users info
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of user info
 */
dataRouter.get("/users_info", (req, res) => {
  const sql = "SELECT * FROM users_info";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/**
 * @swagger
 * /data/symptoms_list:
 *   get:
 *     summary: Get all symptoms
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of symptoms
 */
dataRouter.get("/symptoms_list", (req, res) => {
  const sql = "SELECT * FROM symptoms";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default dataRouter;
