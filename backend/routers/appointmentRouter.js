import { Router } from "express";
import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const appointmentRouter = Router();

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
 *                 format: date
 *                 example: "2026-03-25"
 *               time:
 *                 type: string
 *                 example: "09:00"
 *               note:
 *                 type: string
 *                 example: "มีอาการปวดหัว"
 *                 nullable: true
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
    let { doctorId, patientId, app_datetime_json, note } = req.body;

    if (!doctorId || !patientId) {
      return res.status(400).json({ message: "Missing data" });
    }

    note = note || "";

    // 1. เช็ค doctor
    const [doctor] = await db.query(
      "SELECT * FROM doctors WHERE doctor_id = ?",
      [doctorId],
    );

    if (doctor.length === 0) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    // 2. เช็ค user
    const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      patientId,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // 3. สร้าง UUID
    const appId = uuidv4();

    // 4. insert appointment
    await db.query(
      `INSERT INTO appointments 
      (app_id, user_id, doctor_id,hospital_id, status, note)
      VALUES (?, ?, ?, ?, 'pending', ?)`,
      [appId, patientId, doctorId, doctor[0].hospital_id, note],
    );

    // 5. รวม date + time
    // const slotDatetime = `${date} ${time}:00`;
    if (!Array.isArray(app_datetime_json) || app_datetime_json.length === 0) {
      return res.status(400).json({ message: "Invalid appointment time data" });
    }

    if (typeof app_datetime_json === "string") {
      app_datetime_json = JSON.parse(app_datetime_json);
    }
    // 6. insert slot
    const values = app_datetime_json.map((slot) => [
      appId,
      `${slot.date} ${slot.times}:00`,
    ]);

    await db.query(
      `INSERT INTO appointment_slots (app_id, slot_datetime)
   VALUES ?`,
      [values],
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
// delete
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
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Delete success
 *         content:
 *           application/json:
 *             example:
 *               message: "Deleted successfully"
 *       400:
 *         description: Missing appointmentId
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing appointmentId"
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Appointment not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
appointmentRouter.delete("/delete", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Missing appointmentId" });
    }

    await connection.beginTransaction();

    // ลบ slot
    await connection.query("DELETE FROM appointment_slots WHERE app_id = ?", [
      appointmentId,
    ]);

    // ลบ appointment
    const [result] = await connection.query(
      "DELETE FROM appointments WHERE app_id = ?",
      [appointmentId],
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Appointment not found" });
    }

    await connection.commit();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  } finally {
    connection.release();
  }
});

// update appointment
/**
 * @swagger
 * /appointment/updateAppointment/{id}:
 *   put:
 *     summary: อัปเดตสถานะใบนัดหมาย
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของ appointment
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, booked, completed, cancel]
 *                 example: booked
 *               confirmed_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-19 10:00:00"
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Updated successfully"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             examples:
 *               invalidStatus:
 *                 value:
 *                   message: "Invalid status"
 *               missingConfirmedAt:
 *                 value:
 *                   message: "confirmed_at is required"
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Appointment not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
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
    console.error("DB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /appointment/reschedule/{id}:
 *   put:
 *     summary: เลื่อนนัดหมาย
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - slot_datetime
 *             properties:
 *               slot_datetime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-03-25T09:00:00.000Z"
 *     responses:
 *       200:
 *         description: Rescheduled successfully
 *       500:
 *         description: Internal server error
 */
appointmentRouter.put("/reschedule/:id", async (req, res) => {
  const { id } = req.params;
  const { app_datetime_json } = req.body;
  const connection = await db.getConnection();

  try {
    if (!Array.isArray(app_datetime_json) || app_datetime_json.length === 0) {
      return res.status(400).json({ message: "Invalid appointment time data" });
    }

    await connection.beginTransaction();

    await connection.query(
      "DELETE FROM appointment_slots WHERE app_id = ?",
      [id]
    );

    const values = app_datetime_json.map((slot) => [
      id,
      `${slot.date} ${slot.times}:00`,
    ]);

    await connection.query(
      "INSERT INTO appointment_slots (app_id, slot_datetime) VALUES ?",
      [values]
    );

    await connection.query(
      "UPDATE appointments SET status = 'pending', updated_at = NOW() WHERE app_id = ?",
      [id]
    );

    await connection.commit();
    res.json({ message: "Rescheduled successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("RESCHEDULE ERROR:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  } finally {
    connection.release();
  }
});

export default appointmentRouter;
