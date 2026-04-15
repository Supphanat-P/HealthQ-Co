import { Router } from "express";
import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const appointmentRouter = Router();

// CREATE
/**
 * @swagger
 * /appointment/create:
 *   post:
 *     summary: สร้างใบนัดหมาย
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
 *               note:
 *                 type: string
 *                 example: "มีอาการปวดหัวและไข้สูง"
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
    const { doctorId, patientId, date, time, note } = req.body;

    if (!doctorId || !patientId || !date || !time || !note) {
      return res.status(400).json({ message: "Missing data" });
    }

    //  1. เช็ค doctor
    const [doctor] = await db.query(
      "SELECT * FROM doctors WHERE doctor_id = ?",
      [doctorId],
    );

    if (doctor.length === 0) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    const hospitalId = doctor[0].hospital_id;

    //  2. เช็ค user
    const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      patientId,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    //  3. สร้าง UUID เอง
    const appId = uuidv4();

    // 4. insert appointment
    await db.query(
      `INSERT INTO appointments (app_id, user_id,doctor_id, hospital_id, status,note)
       VALUES (?, ?, ?, ?, 'pending', ?)`,
      [appId, patientId, doctorId, hospitalId, note],
    );

    // 5. รวม date + time
    const slotDatetime = `${date} ${time}:00`;

    // 6. insert slot
    await db.query(
      `INSERT INTO appointment_slots (app_id, slot_datetime)
       VALUES (?, ?)`,
      [appId, slotDatetime],
    );

    res.json({
      message: "Success",
      appointmentId: appId,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

// CANCEL
/**
 * @swagger
 * /appointment/cancelAppointment:
 *   put:
 *     summary: ยกเลิกใบนัดหมาย
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
      [appointmentId],
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
 *     summary: ลบใบนัดหมาย
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
    await db.query("DELETE FROM appointment_slots WHERE app_id = ?", [
      appointmentId,
    ]);

    //  ลบ appointment
    const [result] = await db.query(
      "DELETE FROM appointments WHERE app_id = ?",
      [appointmentId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

appointmentRouter.put("/updateAppointment/:id", async (req, res) => {
  const { id } = req.params;
  let { status, confirmed_at } = req.body;

  try {
    const allowedStatus = ["pending", "booked", "completed", "cancel"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (status === "booked") {
      if (!confirmed_at) {
        return res.status(400).json({
          message: "confirmed_at is required",
        });
      }

      confirmed_at = dayjs(confirmed_at)
        .add(7, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      confirmed_at = null;
    }

    const [result] = await db.query(
      `
      UPDATE appointments 
      SET status = ?, confirmed_at = ?, updated_at = NOW()
      WHERE app_id = ?
      `,
      [status, confirmed_at, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("DB ERROR:", err); // 🔥 เพิ่ม log
    res.status(500).json({ message: err.message });
  }
});

export default appointmentRouter;
