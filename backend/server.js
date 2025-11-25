require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to) {
    return res
      .status(400)
      .json({ success: false, error: "No recipient (to) provided" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Otp Code for Health Queue",
      text,
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/send-confirm-email", async (req, res) => {
  const { to, subject, content } = req.body;

  if (!to) {
    return res
      .status(400)
      .json({ success: false, error: "No recipient (to) provided" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "การจองเเพทย์ของคุณยืนยันเเล้ว",
      text: "",
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending confirmation email:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
