import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("HealthQ Backend is running 🚀");
});

app.post("/send-otp-email", async (req, res) => {
  const { to, text } = req.body;

  if (!to || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"HealthQ" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<p>Your verification code is: <strong>${text}</strong></p>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);

    return res.json({ message: "Email sent", success: true });
  } catch (error) {
    console.error("Email error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Email sending failed",
    });
  }
});

app.post("/send-approve-email", async (req, res) => {
  const { to, details } = req.body;

  if (!to || !details) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"HealthQ" <${process.env.SMTP_USER}>`,
    to,
    subject: details.title || "Your Appointment Has Been Approved",
    html: `
      <p>Hospital Name: <strong>${details.hospitalName}</strong></p>
      <p>Doctor Name: <strong>${details.doctorName}</strong></p>
      <p>Patient Name: <strong>${details.patientName}</strong></p>
      <p>Date: <strong>${details.date}</strong></p>
      <p>Time: <strong>${details.time}</strong></p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Email sent" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/send-cancel-email", async (req, res) => {
  const { to, details } = req.body;

  if (!to || !details) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"HealthQ" <${process.env.SMTP_USER}>`,
    to,
    subject: details.title || "Your Appointment Has Been Cancelled",
    html: `
      <p>Sorrry!. your appointment has been cancelled</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Email sent" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on ${port}`));
