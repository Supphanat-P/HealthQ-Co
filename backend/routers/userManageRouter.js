import { Router } from "express";
import db from "../config/db.js";

const userManageRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: userManage
 *     description: User and Appointment management APIs
 */

/**
 * @swagger
 * /userManage/getAppointmentsByUser:
 *   get:
 *     summary: ดึงประวัติการนัดหมายของผู้ป่วย (Get appointment history by user ID)
 *     tags: [userManage]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของผู้ป่วย
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
userManageRouter.get('/getAppointmentsByUser', async (req, res) => {
    try {
        const userId = req.query.user_id;
        const sql = "SELECT * FROM appointments WHERE user_id = ?"; 
        
        const [rows] = await db.query(sql, [userId]);
        
        res.status(200).json({ message: "Success", appointments: rows });
    } catch (err) {
        console.error("Error getAppointmentsByUser:", err);
        res.status(500).json({ message: "Error", error: err.message });
    }
});

/**
 * @swagger
 * /userManage/getUserInfo:
 *   get:
 *     summary: ดึงข้อมูลส่วนตัวของผู้ป่วย (Get user information)
 *     tags: [userManage]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของผู้ป่วย
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
userManageRouter.get('/getUserInfo', async (req, res) => {
    try {
        const userId = req.query.user_id; 
        const sql = "SELECT user_id, first_name, last_name, email, phone FROM users_info WHERE user_id = ?";

        const [rows] = await db.query(sql, [userId]);
        
        res.status(200).json({ message: "Success", userInfo: rows[0] });
    } catch (err) {
        console.error("Error getUserInfo:", err);
        res.status(500).json({ message: "Error", error: err.message });
    }
});

/**
 * @swagger
 * /userManage/updateUserInfo:
 *   post:
 *     summary: แก้ไขข้อมูลส่วนตัวของผู้ป่วย (Update user information)
 *     tags: [userManage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "0812345678"
 *               emergency_contact:
 *                 type: string
 *                 example: "0898765432"
 *               weight:
 *                 type: number
 *                 example: 65.5
 *               height:
 *                 type: number
 *                 example: 170
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       500:
 *         description: Update Failed
 */
userManageRouter.post('/updateUserInfo', async (req, res) => {
    try {
        const userId = req.user?.id || '433eac44-22ce-11f1-8430-d61288df7fa9'; 
        const { phone, emergency_contact, weight, height } = req.body;

        const sql = `
            UPDATE users_info 
            SET phone = ?, emergency_contact = ?, weight = ?, height = ? 
            WHERE user_id = ?
        `;

        const [result] = await db.query(sql, [phone, emergency_contact, weight, height, userId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }

        res.status(200).json({ message: "Success", detail: "User information updated successfully" });
    } catch (err) {
        console.error("Error updateUserInfo:", err);
        res.status(500).json({ message: "Update Failed", error: err.message });
    }
});

export default userManageRouter;