import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// [POST] /getAppointmentsByUser - ดึงประวัติการนัดหมายของผู้ป่วย
router.get('/getAppointmentsByUser', (req, res) => {
    const userId = req.query.user_id;

    const sql = "SELECT * FROM appointments WHERE user_id = ?"; 

    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Error", error: err });
        
        res.status(200).json({ 
            message: "Success", 
            appointments: result 
        });
    });
});

// [POST] /getUserInfo - ดึงข้อมูลส่วนตัวของผู้ป่วย
router.get('/getUserInfo', (req, res) => {
    const userId = req.query.user_id; 

    const sql = "SELECT user_id, first_name, last_name, email, phone FROM users_info WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Error", error: err });
        
        res.status(200).json({ 
            message: "Success", 
            userInfo: result[0] 
        });
    });
});

// [POST] /updateUserInfo - แก้ไขข้อมูลส่วนตัวของผู้ป่วย
router.post('/updateUserInfo', (req, res) => {
    const userId = req.user?.id || '433eac44-22ce-11f1-8430-d61288df7fa9'; 
    const { phone, emergency_contact, weight, height } = req.body;

    const sql = `
        UPDATE users_info 
        SET phone = ?, 
            emergency_contact = ?, 
            weight = ?, 
            height = ? 
        WHERE user_id = ?
    `;

    db.query(sql, [phone, emergency_contact, weight, height, userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Update Failed", error: err });
        
        res.status(200).json({ 
            message: "Success", 
            detail: "User information updated successfully" 
        });
    });
});

export default router;