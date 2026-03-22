import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailRouters = Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

const otpStore = {};
// { email: { otp, expiresAt } }

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * @swagger
 * /mail/send-otp-email:
 *   post:
 *     summary: Send OTP to email
 *     tags: [Mail]
 */
mailRouters.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    await transporter.sendMail({
      from: `"HealthQ" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    return res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Send OTP failed",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /mail/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Mail]
 */
mailRouters.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Missing data" });
  }

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ message: "No OTP found" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "OTP incorrect" });
  }

  delete otpStore[email];

  return res.json({
    success: true,
    message: "OTP verified successfully",
  });
});

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
