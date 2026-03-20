import express, { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailRouters = Router();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const otpStore = {};

// ================== 🔥 SEND OTP ==================
mailRouters.post("/send-otp-Email", (req, res) => {
  const { email } = req.body; //  รับ email จาก client

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOtp();

  //  เก็บ OTP
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const option = {
    from: process.env.SMTP_MAIL,
    to: email, 
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: ${otp}</h2>`,
  };

  transporter.sendMail(option, (err, info) => {
    if (err) {
      return res.status(500).json({
        message: "failed",
        error: err,
      });
    }

    return res.json({
      message: "OTP sent",
      //  เอา otp ออกตอนใช้จริง
      otp, 
    });
  });
});


// ================== VERIFY OTP ==================
mailRouters.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; //  ลบหลังใช้

    return res.json({
      success: true,
      message: "OTP correct",
    });
  }

  return res.status(400).json({
    success: false,
    message: "OTP incorrect",
  });
});

export default mailRouters;
// import nodemailer from "nodemailer";
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
// app.post("/send-otp-email", async (req, res) => {
//   const { to, text } = req.body;

//   if (!to || !text) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const mailOptions = {
//     from: `"HealthQ" <${process.env.SMTP_USER}>`,
//     to,
//     subject: "Your OTP Code",
//     html: `<p>Your verification code is: <strong>${text}</strong></p>`,
//   };

//   try {
//     const result = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", result);

//     return res.json({ message: "Email sent", success: true });
//   } catch (error) {
//     console.error("Email error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Email sending failed",
//     });
//   }
// });

// app.post("/send-approve-email", async (req, res) => {
//   const { to, details } = req.body;

//   if (!to || !details) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const mailOptions = {
//     from: `"HealthQ" <${process.env.SMTP_USER}>`,
//     to,
//     subject: details.title || "Your Appointment Has Been Approved",
//     html: `
//       <p>Hospital Name: <strong>${details.hospitalName}</strong></p>
//       <p>Doctor Name: <strong>${details.doctorName}</strong></p>
//       <p>Patient Name: <strong>${details.patientName}</strong></p>
//       <p>Date: <strong>${details.date}</strong></p>
//       <p>Time: <strong>${details.time}</strong></p>
//     `,
//   };

//   try {
//     const result = await transporter.sendMail(mailOptions);
//     return res.json({ success: true, message: "Email sent" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.post("/send-cancel-email", async (req, res) => {
//   const { to, details } = req.body;

//   if (!to || !details) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const mailOptions = {
//     from: `"HealthQ" <${process.env.SMTP_USER}>`,
//     to,
//     subject: details.title || "Your Appointment Has Been Cancelled",
//     html: `
//       <p>Sorrry!. your appointment has been cancelled</p>
//     `,
//   };

//   try {
//     const result = await transporter.sendMail(mailOptions);
//     return res.json({ success: true, message: "Email sent" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });
