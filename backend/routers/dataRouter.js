import { Router } from "express";
import db from "../config/db.js";

import {
  getAllDoctors,
  getDoctorById,
  deleteDoctorById,
  insertDoctor,
  getAllSpecialties,
  getSpecialtyById,
  deleteSpecialtiesById,
  insertSpecialties,
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
 * /data/doctors/{doctor_id}:
 *   delete:
 *     summary: Delete Doctor by ID
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
 *         description: Doctor deleted successfully
 *       400:
 *        description: Invalid doctor id
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
dataRouter.delete("/doctors/:id", async (req, res) => {
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
 * /data/insertDoctor:
 *   post:
 *     summary: Insert a new doctor
 *     tags: [Data]
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
 *         description: Doctor inserted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
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
    console.error("❌ Insert doctor error:", err);
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
 *     summary: ดึงรายการ specialty ทั้งหมด
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 */
dataRouter.get("/specialties", async (req, res) => {
  try {
    const specialties = await getAllSpecialties();
    res.status(200).json(specialties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/specialties/{specialty_id}:
 *   get:
 *     summary: ดึงข้อมูล specialty ตาม ID
 *     tags: [Data]
 *     parameters:
 *       - name: specialty_id
 *         in: path
 *         required: true
 *         description: รหัส specialty
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *       404:
 *         description: ไม่พบข้อมูล
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 */
dataRouter.get("/specialties/:id", async (req, res) => {
  try {
    const specialtyId = req.params.id;
    const specialty = await getSpecialtyById(specialtyId);

    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }

    res.status(200).json(specialty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/specialties/{specialty_id}:
 *   delete:
 *     summary: ลบ specialty ตาม ID
 *     tags: [Data]
 *     parameters:
 *       - name: specialty_id
 *         in: path
 *         required: true
 *         description: รหัส specialty (ต้องเป็นตัวเลข)
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: ลบข้อมูลสำเร็จ
 *       400:
 *         description: ID ไม่ถูกต้อง
 *       404:
 *         description: ไม่พบข้อมูล
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 */
dataRouter.delete("/specialties/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "ID ไม่ถูกต้อง" });
  }

  console.log(`[DELETE] Request to delete specialty_id: ${id}`);

  try {
    const result = await deleteSpecialtiesById(id);

    if (result.affectedRows === 0) {
      console.warn(`[DELETE] Not found: ${id}`);
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    console.log(`[DELETE] Success: ${id}`);

    return res.status(200).json({
      message: "ลบความชำนาญแพทย์เรียบร้อย",
      deletedId: id
    });

  } catch (err) {
    console.error("[DELETE] Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/specialties:
 *   post:
 *     summary: สร้าง specialty ใหม่
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialty_name
 *             properties:
 *               specialty_name:
 *                 type: string
 *                 example: Cardiology
 *     responses:
 *       201:
 *         description: สร้างข้อมูลสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       409:
 *         description: ข้อมูลซ้ำ
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 */
dataRouter.post("/specialties", async (req, res) => {
  try {
    let { specialty_name } = req.body;

    specialty_name = specialty_name?.trim();

    if (!specialty_name) {
      return res.status(400).json({
        message: "specialty_name ห้ามเป็นค่าว่าง"
      });
    }

    console.log(`[POST] Create specialty -> Name: ${specialty_name}`);

    const result = await insertSpecialties({
      specialty_name
    });

    return res.status(201).json({
      message: "สร้างข้อมูลสำเร็จ",
      data: {
        specialty_name
      }
    });

  } catch (err) {
    console.error("[POST] Error:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "specialty_id นี้มีอยู่แล้ว"
      });
    }

    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในระบบ",
      error: err.message
    });
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
