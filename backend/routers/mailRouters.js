import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailRouters = Router();

// ================== CONFIG ==================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

// ================== OTP STORE ==================
const otpStore = {}; 
// structure: { email: { otp, expiresAt } }

// ================== GENERATE OTP ==================
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * @swagger
 * /mail/send-otp-email:
 *   post:
 *     summary: Send OTP to email
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *     responses:
 *       200:
 *         description: OTP sent
 */
mailRouters.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();

    // ⏳ หมดอายุใน 5 นาที
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    const mailOptions = {
      from: `"HealthQ" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    };

    await transporter.sendMail(mailOptions);

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP correct
 */
mailRouters.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({
      success: false,
      message: "No OTP found",
    });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  if (record.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "OTP incorrect",
    });
  }

  delete otpStore[email];

  return res.json({
    success: true,
    message: "OTP verified successfully",
  });
});

export default mailRouters;