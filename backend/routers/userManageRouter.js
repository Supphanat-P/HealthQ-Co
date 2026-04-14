import { Router } from "express";
import db from "../config/db.js";
import crypto from "crypto";

const userManageRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: userManage
 *     description: User and Appointment management APIs (Patient Side)
 */
// =================================================
// 2️⃣ GET APPOINTMENTS
// =================================================
/**
 * @swagger
 * /userManage/getAppointmentsByUser:
 *   get:
 *     summary: ดึงข้อมูลการนัดหมายของผู้ใช้
 *     tags: [userManage]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
userManageRouter.get("/getAppointmentsByUser", async (req, res) => {
  try {
    const { user_id } = req.query;

    const [rows] = await db.query(
      "SELECT * FROM appointments WHERE user_id = ?",
      [user_id],
    );

    res.status(200).json({
      message: "Success",
      appointments: rows,
    });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

// =================================================
// 4️⃣ UPDATE USER INFO
// =================================================
/**
 * @swagger
 * /userManage/updateUserInfo:
 *   put:
 *     summary: แก้ไขข้อมูลผู้ใช้
 *     tags: [userManage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               phone:
 *                 type: string
 *               emergency_contact:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *     responses:
 *       200:
 *         description: User information updated successfully
 */
userManageRouter.put("/updateUserInfo", async (req, res) => {
  try {
    const { user_id, phone, emergency_contact, weight, height } = req.body;

    const [result] = await db.query(
      `UPDATE users_info
       SET phone=?, emergency_contact=?, weight=?, height=?
       WHERE user_id=?`,
      [phone, emergency_contact, weight, height, user_id],
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Success",
      detail: "User information updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
});

// =================================================
// 5️⃣ DELETE USER
// =================================================
/**
 * @swagger
 * /userManage/deleteUser:
 *   delete:
 *     summary: ลบบัญชีผู้ใช้งาน
 *     tags: [userManage]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userManageRouter.delete("/deleteUser", async (req, res) => {
  try {
    const { user_id } = req.query;

    await db.query("DELETE FROM users_info WHERE user_id = ?", [user_id]);

    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [
      user_id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Success",
      detail: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Delete Failed", error: err.message });
  }
});

// =================================================
// 3️⃣ GET USER INFO
// =================================================
/**
 * @swagger
 * /userManage/getUserInfoByUserId:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้
 *     tags: [userManage]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
userManageRouter.get("/getUserInfoByUserId", async (req, res) => {
  try {
    const { user_id } = req.query;

    const [rows] = await db.query(
      `SELECT *
       FROM users u
       JOIN users_info ui ON u.user_id = ui.user_id
       WHERE u.user_id = ?`,
      [user_id],
    );

    res.status(200).json({
      message: "Success",
      userInfo: rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

export default userManageRouter;
