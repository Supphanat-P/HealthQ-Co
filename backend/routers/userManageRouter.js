import express from 'express';
import db from '../config/db.js';

const router = express.Router();

//ดึงข้อมูลการจองของผู้ป่วย
router.post('/getAppointmentsByUser', async (req, res) => {
    // ในความเป็นจริงต้องมี user_id จาก Token หรือ Session
    const sql = "SELECT * FROM appointments WHERE patient_id = ?"; 
    
    db.query(sql, [/* patientId */], (err, result) => {
        if (err) return res.status(500).json({ message: "Error", error: err });
        
        // ส่ง Response 
        res.status(200).json({ 
            message: "Success", 
            appointments: result 
        });
    });
});

//ดึงข้อมูลส่วนตัวของผู้ป่วย
router.post('/getUserInfo', async (req, res) => {
    const sql = "SELECT id, name, email, phone FROM patients WHERE id = ?";
    
    db.query(sql, [/* patientId */], (err, result) => {
        if (err) return res.status(500).json({ message: "Error", error: err });

        res.status(200).json({ 
            message: "Success", 
            userInfo: result[0] // ส่งข้อมูลผู้ป่วยคนเดียว
        });
    });
});

// [POST] /updateUserInfo - แก้ไขข้อมูลส่วนตัวของผู้ป่วย
router.post('/updateUserInfo', (req, res) => {
    const userId = req.user?.id || '433eac44-22ce-11f1-8430-d61288df7fa9'; //
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