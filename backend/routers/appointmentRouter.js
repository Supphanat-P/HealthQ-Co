import { Router } from "express";
import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const appointmentRouter = Router();

// CREATE
/**
 * @swagger
 * /appointment/create:
 *   post:
 *     summary: Create new appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - patientId
 *               - date
 *               - time
 *             properties:
 *               doctorId:
 *                 type: integer
 *                 example: 1
 *               patientId:
 *                 type: string
 *                 example: "2"
 *               date:
 *                 type: string
 *                 example: "2026-03-25"
 *               time:
 *                 type: string
 *                 example: "09:00"
 *     responses:
 *       200:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *               appointmentId: "uuid-xxxx"
 *       400:
 *         description: Missing data / invalid
 *       500:
 *         description: Internal server error
 */
appointmentRouter.post("/create", async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    if (!doctorId || !patientId || !date || !time) {
      return res.status(400).json({ message: "Missing data" });
    }

    //  1. เช็ค doctor
    const [doctor] = await db.query(
      "SELECT * FROM doctors WHERE doctor_id = ?",
      [doctorId]
    );

    if (doctor.length === 0) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    //  2. เช็ค user
    const [user] = await db.query(
      "SELECT * FROM users WHERE user_id = ?",
      [patientId]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    //  3. สร้าง UUID เอง (ดีที่สุด)
    const appId = uuidv4();

    // 4. insert appointment
    await db.query(
      `INSERT INTO appointments (app_id, doctor_id, user_id, status)
       VALUES (?, ?, ?, 'pending')`,
      [appId, doctorId, patientId]
    );

    // 5. รวม date + time
    const slotDatetime = `${date} ${time}:00`;

    // 6. insert slot
    await db.query(
      `INSERT INTO appointment_slots (app_id, slot_datetime)
       VALUES (?, ?)`,
      [appId, slotDatetime]
    );

    res.json({
      message: "Success",
      appointmentId: appId,
    });

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error"
    });
  }
});

// CANCEL
/**
 * @swagger
 * /appointment/cancelAppointment:
 *   put:
 *     summary: Cancel appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 example: "uuid-xxxx"
 *     responses:
 *       200:
 *         description: Cancel success
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *       400:
 *         description: Missing appointmentId
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
appointmentRouter.put("/cancelAppointment", async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Missing appointmentId" });
    }

    const [result] = await db.query(
      `UPDATE appointments SET status = 'cancelled' WHERE app_id = ?`,
      [appointmentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Success" });

  } catch (error) {
    console.error("CANCEL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
//delete
/**
 * @swagger
 * /appointment/delete:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 example: "uuid-xxxx"
 *     responses:
 *       200:
 *         description: Delete success
 *         content:
 *           application/json:
 *             example:
 *               message: "Deleted successfully"
 *       400:
 *         description: Missing appointmentId
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
appointmentRouter.delete("/delete", async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Missing appointmentId" });
    }

    //  ลบ slot ก่อน (กัน foreign key error)
    await db.query(
      "DELETE FROM appointment_slots WHERE app_id = ?",
      [appointmentId]
    );

    //  ลบ appointment
    const [result] = await db.query(
      "DELETE FROM appointments WHERE app_id = ?",
      [appointmentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error"
    });
  }
});


export default appointmentRouter;