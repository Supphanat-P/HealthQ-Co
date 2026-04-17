import { Router } from "express";
import db from "../config/db.js";

import {
  getAllDoctors,
  getDoctorById,
  deleteDoctorById,
  insertDoctor,
  updateDoctorById,
  getAllSpecialties,
  getSpecialtyById,
  deleteSpecialtiesById,
  insertSpecialties,
  updateSpecialtyById,
  insertHospital,
  deleteHospitalById,
  updateHospitalById,
  getAllHospital,
  getHospitalById,
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
 *     tags: [Hospital]
 *     responses:
 *       200:
 *         description: List of hospitals
 *       500:
 *         description: List of symptoms
 */
dataRouter.get("/hospitals", async (req, res) => {
  try {
    const result = await getAllHospital();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/updateHospital/{id}:
 *   put:
 *     summary: Update hospital by ID
 *     description: อัปเดตข้อมูลโรงพยาบาลตาม ID
 *     tags: [Hospital]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสโรงพยาบาล
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hospital_name
 *               - imgPath
 *               - lat
 *               - lang
 *             properties:
 *               hospital_name:
 *                 type: string
 *                 example: Bangkok Hospital
 *               imgPath:
 *                 type: string
 *                 example: /images/hospital.jpg
 *               lat:
 *                 type: number
 *                 format: float
 *                 example: 13.7563
 *               lang:
 *                 type: number
 *                 format: float
 *                 example: 100.5018
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 *         content:
 *           application/json:
 *             example:
 *               message: Hospital updated successfully
 *               result:
 *                 affectedRows: 1
 *       500:
 *         description: Server error
 */
dataRouter.put("/updateHospital/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const { hospital_name, imgPath, lat, lang } = req.body;

    const result = await updateHospitalById(hospitalId, {
      hospital_name,
      imgPath,
      lat,
      lang,
    });

    res.status(200).json({
      message: "Hospital updated successfully",
      result,
    });
  } catch (err) {
    console.error("Update Hospital error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/hospitals/{hospital_id}:
 *   delete:
 *     summary: Delete hospital
 *     tags: [Hospital]
 *     parameters:
 *       - in: path
 *         name: hospital_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Hospital deleted successfully
 *       400:
 *         description: Invalid hospital id
 *       404:
 *         description: Hospital not found
 *       500:
 *         description: Server error
 */
dataRouter.delete("/hospitals/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;

    if (!hospitalId || isNaN(hospitalId)) {
      return res.status(400).json({ message: "Invalid hospital id" });
    }

    const deletedInfo = await getHospitalById(hospitalId);

    if (!deletedInfo) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const result = await deleteHospitalById(hospitalId);
    const affectedRows = result.affectedRows ?? result[0]?.affectedRows;

    res.status(200).json({
      message: "Hospital deleted successfully",
      deletedInfo,
      affectedRows,
    });
  } catch (err) {
    console.error("Delete hospital error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/insertHospital:
 *   post:
 *     summary: Create new hospital
 *     description: เพิ่มข้อมูลโรงพยาบาลใหม่
 *     tags: [Hospital]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hospital_name
 *               - imgPath
 *               - lat
 *               - lang
 *             properties:
 *               hospital_name:
 *                 type: string
 *                 example: Bangkok Hospital
 *               imgPath:
 *                 type: string
 *                 example: /images/hospital.jpg
 *               lat:
 *                 type: number
 *                 format: float
 *                 example: 13.7563
 *               lang:
 *                 type: number
 *                 format: float
 *                 example: 100.5018
 *     responses:
 *       200:
 *         description: Hospital inserted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Hospital inserted successfully
 *               hospital_id: 1
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
dataRouter.post("/insertHospital", async (req, res) => {
  try {
    const { hospital_name, imgPath, lat, lang } = req.body;

    if (!hospital_name || !imgPath || lat == null || lang == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await insertHospital({
      hospital_name,
      imgPath,
      lat,
      lang,
    });

    res.status(200).json({
      message: "Hospital inserted successfully",
      hospital_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Insert Hospital error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/specialties:
 *   get:
 *     summary: ดึงรายการ specialty ทั้งหมด
 *     tags: [Specialty]
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
 *     tags: [Specialty]
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
 *     tags: [Specialty]
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
      deletedId: id,
    });
  } catch (err) {
    console.error("[DELETE] Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/updateSpecialty/{specialty_id}:
 *   put:
 *     summary: อัปเดตชื่อ specialty ตาม ID
 *     tags: [Specialty]
 *     parameters:
 *       - name: specialty_id
 *         in: path
 *         required: true
 *         description: รหัส specialty ที่ต้องการแก้ไข
 *         schema:
 *           type: integer
 *           example: 101
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
 *                 example: Cardiology Updated
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       404:
 *         description: ไม่พบ specialty
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 */
dataRouter.put("/updateSpecialty/:id", async (req, res) => {
  try {
    const specialtyId = req.params.id;
    const { specialty_name } = req.body;

    const result = await updateSpecialtyById(specialtyId, {
      specialty_name,
    });
    res
      .status(200)
      .json({ message: "Specialty updated successfully", ...result });
  } catch (err) {
    console.error("Update specialty error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /data/specialties:
 *   post:
 *     summary: สร้าง specialty ใหม่
 *     tags: [Specialty]
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
        message: "specialty_name ห้ามเป็นค่าว่าง",
      });
    }

    console.log(`[POST] Create specialty -> Name: ${specialty_name}`);

    const result = await insertSpecialties({
      specialty_name,
    });

    return res.status(201).json({
      message: "สร้างข้อมูลสำเร็จ",
      data: {
        specialty_name,
      },
    });
  } catch (err) {
    console.error("[POST] Error:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "specialty_id นี้มีอยู่แล้ว",
      });
    }

    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในระบบ",
      error: err.message,
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
  try {
    const [appointments] = await db.query(`
      SELECT 
  a.*, 
  d.doctor_name,
  h.hospital_name,
  u.full_name AS patient_name,
  u.email AS patient_email
FROM appointments a
JOIN doctors d ON a.doctor_id = d.doctor_id
JOIN hospitals h ON d.hospital_id = h.hospital_id
JOIN users u ON a.user_id = u.user_id
    `);

    const [slots] = await db.query(`
      SELECT * FROM appointment_slots
    `);

    const result = appointments.map((app) => ({
      ...app,

      user: {
        full_name: app.patient_name,
        email: app.patient_email,
      },

      doctor: {
        doctor_name: app.doctor_name,
        hospital_name: app.hospital_name,
      },

      appointment_slots: slots.filter((s) => s.app_id === app.app_id),
    }));

    res.json(result);
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
