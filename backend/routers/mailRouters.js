import express, { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailRouters = Router();

// ================== 🔥 CREATE TRANSPORTER (ใช้ร่วมกัน) ==================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

// ================== 🔥 OTP FUNCTION ==================
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// เก็บ OTP + expire
const otpStore = {};

// ================== 🔥 SEND OTP ==================
// {
//   "email": "email@gmail.com"
// }
mailRouters.post("/send-otp-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOtp();

  // เก็บ OTP + อายุ 5 นาที
  otpStore[email] = {
    otp,
    expire: Date.now() + 5 * 60 * 1000,
  };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    return res.json({
      message: "OTP sent",
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed",
      error: error.message,
    });
  }
});

// ================== 🔥 VERIFY OTP ==================
// {
//   "email": "email@gmail.com",
//   "otp": ""
// }
mailRouters.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Missing data" });
  }

  const data = otpStore[email];

  if (!data) {
    return res.status(400).json({ message: "No OTP found" });
  }

  // เช็คหมดอายุ
  if (Date.now() > data.expire) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  // เช็ค OTP
  if (data.otp !== otp) {
    return res.status(400).json({ message: "OTP incorrect" });
  }

  // ใช้แล้วลบ
  delete otpStore[email];

  return res.json({
    success: true,
    message: "OTP correct",
  });
});

// ================== 🔥 APPROVE EMAIL ==================
// {
//   "to": "email@gmail.com",
//   "details": {
//     "hospitalName": "ABC",
//     "doctorName": "Dr.X",
//     "date": "2026-03-22",
//     "time": "10:00"
//   }
// }
mailRouters.post("/send-approve-email", async (req, res) => {
  const { to, details } = req.body;

  if (!to || !details) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await transporter.sendMail({
      from: `"HealthQ" <${process.env.SMTP_MAIL}>`,
      to,
      subject: "Appointment Approved",
      html: `
        <p>Hospital: ${details.hospitalName}</p>
        <p>Doctor: ${details.doctorName}</p>
        <p>Date: ${details.date}</p>
        <p>Time: ${details.time}</p>
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ================== 🔥 CANCEL EMAIL ==================
// {
//   "to": "emailมึง@gmail.com"
// }
mailRouters.post("/send-cancel-email", async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ message: "Missing email" });
  }

  try {
    await transporter.sendMail({
      from: `"HealthQ" <${process.env.SMTP_MAIL}>`,
      to,
      subject: "Appointment Cancelled",
      html: `<p>Your appointment has been cancelled</p>`,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default mailRouters;