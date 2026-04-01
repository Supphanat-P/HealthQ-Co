import { Router } from "express";
import db from "../config/db.js";

import {
  getAllDoctors,
  getDoctorById,
  deleteDoctorById,
  insertDoctor,
  updateDoctorById,
} from "../models/dataModels.js";

const dataRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management APIs
 */

/**
 * @swagger
 * /data/getAllDoctors:
 *   get:
 *     summary: ดึงข้อมูลแพทย์ทั้งหมด
 *     description: ใช้สำหรับดึงรายการแพทย์ทั้งหมดในระบบ
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลแพทย์สำเร็จ
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */
dataRouter.get("/getAllDoctors", async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/getDoctor/{id}:
 *   get:
 *     summary: ดึงข้อมูลแพทย์ตามรหัส
 *     description: ดึงข้อมูลแพทย์ตาม ID พร้อมข้อมูลสาขาและโรงพยาบาล
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสแพทย์
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ดึงข้อมูลแพทย์สำเร็จ
 *       404:
 *         description: ไม่พบข้อมูลแพทย์
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */
dataRouter.get("/getDoctor/:id", async (req, res) => {
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
 * /data/deleteDoctor/{id}:
 *   delete:
 *     summary: ลบข้อมูลแพทย์
 *     description: ลบข้อมูลแพทย์ตาม ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสแพทย์
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ลบข้อมูลแพทย์สำเร็จ
 *       400:
 *         description: รหัสแพทย์ไม่ถูกต้อง
 *       404:
 *         description: ไม่พบข้อมูลแพทย์
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */
dataRouter.delete("/deleteDoctor/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;

    if (!doctorId || isNaN(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor id" });
    }

    const deletedInfo = await getDoctorById(doctorId);

    if (!deletedInfo) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const result = await deleteDoctorById(doctorId);
    const affectedRows = result.affectedRows ?? result[0]?.affectedRows;

    res.status(200).json({
      message: "Doctor deleted successfully",
      deletedInfo,
      affectedRows,
    });
  } catch (err) {
    console.error("Delete doctor error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/updateDoctor/{id}:
 *   patch:
 *     summary: แก้ไขข้อมูลแพทย์บางส่วน
 *     description: อัปเดตเฉพาะ field ที่ส่งมา
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสแพทย์
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor_name:
 *                 type: string
 *                 example: นายแพทย์สมชาย ใจดี
 *               specialty_id:
 *                 type: integer
 *                 example: 2
 *               hospital_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลแพทย์สำเร็จ
 *       400:
 *         description: ไม่มีข้อมูลให้อัปเดต
 *       404:
 *         description: ไม่พบข้อมูลแพทย์
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */
dataRouter.patch("/updateDoctor/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ message: "Missing data for update" });
    }

    const result = await updateDoctorById(doctorId, data);

    res.status(200).json({
      message: "Doctor updated successfully",
      ...result,
    });
  } catch (err) {
    console.error("Update doctor error:", err);

    if (err.message === "No fields to update") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/insertDoctor:
 *   post:
 *     summary: เพิ่มข้อมูลแพทย์
 *     description: ใช้สำหรับเพิ่มข้อมูลแพทย์ใหม่
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_name
 *               - hospital_id
 *               - specialty_id
 *             properties:
 *               doctor_name:
 *                 type: string
 *               hospital_id:
 *                 type: integer
 *               specialty_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลแพทย์สำเร็จ
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */
dataRouter.post("/insertDoctor", async (req, res) => {
  try {
    const { doctor_name, hospital_id, specialty_id } = req.body;

    if (!doctor_name || !hospital_id || !specialty_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await insertDoctor({
      doctor_name,
      hospital_id,
      specialty_id,
    });

    res.status(200).json({
      message: "Doctor inserted successfully",
      doctor_id: result.insertId,
    });
  } catch (err) {
    console.error("Insert doctor error:", err);
    res.status(500).json({ error: err.message });
  }
});

///Doctors Endpoints

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
  const sql =
    "SELECT user_id, email, full_name, created_at, updated_at, role_id FROM users";
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
