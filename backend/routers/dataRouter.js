import { Router } from "express";
import db from "../config/db.js";

import { getAllDoctors, getDoctorById } from "../models/dataModels.js";

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
 *     summary: Get all doctors
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of doctors
 *       500:
 *         description: Server error
 */
dataRouter.get("/doctors", async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/doctors/{doctor_id}:
 *   get:
 *     summary: Get Doctor by ID with specialty and hospital
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Doctor ที่ต้องการ
 *     responses:
 *       200:
 *         description: Doctor data
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
dataRouter.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await getDoctorById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *       500:
 *         description: List of symptoms
 */
dataRouter.get("/hospitals", async (req, res) => {
  const sql = "SELECT * FROM hospitals";

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *       500:
 *         description: List of symptoms
 */
dataRouter.get("/specialties", async (req, res) => {
  const sql = "SELECT * FROM specialties";
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *       500:
 *         description: List of symptoms
 */
dataRouter.get("/appointments", async (req, res) => {
  const sql = `
    SELECT * FROM appointments 
    JOIN doctors ON appointments.doctor_id = doctors.doctor_id
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *       500:
 *         description: Server error
 */
dataRouter.get("/users", async (req, res) => {
  const sql = "SELECT user_id, email, full_name, created_at, updated_at, role_id FROM users";
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *       500:
 *         description: List of symptoms
 */
dataRouter.get("/users_info", async (req, res) => {
  const sql = "SELECT * FROM users_info";
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *       500:
 *         description: List of symptoms
 */
dataRouter.get("/symptoms_list", async (req, res) => {
  const sql = "SELECT * FROM symptoms";
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default dataRouter;
