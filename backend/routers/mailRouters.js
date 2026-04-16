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
 *         description: OTP sent successfully
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
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f8fb; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #2a7fba; color: white; padding: 15px; text-align: center;">
        <h2 style="margin: 0;"> HealthQ Hospital</h2>
      </div>

      <!-- Content -->
      <div style="padding: 20px; text-align: center;">
        <h3 style="color: #333;">OTP Verification</h3>
        <p style="color: #555;">
          กรุณาใช้รหัส OTP ด้านล่างเพื่อยืนยันตัวตนของคุณ
        </p>

        <!-- OTP Box -->
        <div style="
          margin: 20px auto;
          padding: 15px;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 5px;
          color: #2a7fba;
          border: 2px dashed #2a7fba;
          display: inline-block;
          border-radius: 8px;
        ">
          ${otp}
        </div>

        <p style="color: #888; font-size: 14px;">
          รหัสนี้จะหมดอายุภายใน 5 นาที
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        © 2026 HealthQ Hospital. All rights reserved.
      </div>

    </div>
  </div>
`
    });

    return res.json({ message: "OTP sent successfully" });

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
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified
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

/**
 * @swagger
 * /mail/send-approve-email:
 *   post:
 *     summary: Send approve email
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: user@gmail.com
 *               details:
 *                 type: object
 *                 properties:
 *                   hospitalName:
 *                     type: string
 *                   doctorName:
 *                     type: string
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *     responses:
 *       200:
 *         description: Email sent
 */
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
  <div style="font-family: Arial, sans-serif; background-color: #f4f8fb; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #2a7fba; color: white; padding: 15px; text-align: center;">
        <h2 style="margin: 0;"> HealthQ Hospital</h2>
      </div>

      <!-- Content -->
      <div style="padding: 20px;">
        <h3 style="color: #333; text-align: center;">Appointment Approved</h3>
        <p style="color: #555; text-align: center;">
          การนัดหมายของคุณได้รับการอนุมัติเรียบร้อยแล้ว
        </p>

        <!-- Info Box -->
        <div style="
          margin-top: 20px;
          padding: 15px;
          background: #f1f7fc;
          border-left: 5px solid #2a7fba;
          border-radius: 8px;
        ">
          <p><strong> Hospital:</strong> ${details.hospitalName}</p>
          <p><strong> Doctor:</strong> ${details.doctorName}</p>
          <p><strong> Date:</strong> ${details.date}</p>
          <p><strong> Time:</strong> ${details.time}</p>
        </div>

        <p style="margin-top: 20px; color: #555;">
          กรุณามาถึงก่อนเวลานัดหมายอย่างน้อย 10 นาที
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        © 2026 HealthQ Hospital. All rights reserved.
      </div>

    </div>
  </div>
`,
    });

    return res.json({ success: true });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /mail/send-cancel-email:
 *   post:
 *     summary: Send cancel email
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: Email sent
 */
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
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #fdf4f4; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #d9534f; color: white; padding: 15px; text-align: center;">
        <h2 style="margin: 0;"> HealthQ Hospital</h2>
      </div>

      <!-- Content -->
      <div style="padding: 20px;">
        <h3 style="color: #d9534f; text-align: center;">Appointment Cancelled</h3>
        
        <p style="color: #555; text-align: center;">
          การนัดหมายของคุณถูกยกเลิกแล้ว
        </p>

        <!-- Warning Box -->
        <div style="
          margin-top: 20px;
          padding: 15px;
          background: #fff5f5;
          border-left: 5px solid #d9534f;
          border-radius: 8px;
          text-align: center;
        ">
          
        </div>

        <p style="margin-top: 20px; color: #777; font-size: 14px; text-align: center;">
          หากมีข้อสงสัย กรุณาติดต่อโรงพยาบาล
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        © 2026 HealthQ Hospital. All rights reserved.
      </div>

    </div>
  </div>
`
    });

    return res.json({ success: true });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default mailRouters;