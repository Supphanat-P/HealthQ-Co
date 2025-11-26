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

const createHtmlTemplate = (title, bodyContent) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f4f4f7;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="20" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                  <h1 style="margin: 0; color: #001f3f; font-size: 28px;">HealthQ</h1>
                  <p style="margin: 4px 0 0; color: #666; font-size: 16px;">Your Health, Our Priority</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 30px 20px;">
                  <h2 style="margin: 0 0 20px; color: #111; font-size: 22px;">${title}</h2>
                  ${bodyContent}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px 0; border-top: 1px solid #eeeeee; font-size: 12px; color: #999;">
                  <p style="margin: 0;">This is an automated email. Please do not reply.</p>
                  <p style="margin: 4px 0 0;">&copy; ${new Date().getFullYear()} HealthQ Co. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

app.post("/send-email", async (req, res) => {
  const { to, text } = req.body;

  if (!to) {
    return res
      .status(400)
      .json({ success: false, error: "No recipient (to) provided" });
  }

  const subject = "Your OTP Code for HealthQ";
  const bodyContent = `
    <p style="margin: 0 0 20px; font-size: 16px; color: #333; line-height: 1.5;">
      Thank you for registering. Please use the following One-Time Password (OTP) to complete your action.
    </p>
    <div style="background-color: #f0f8ff; border: 1px dashed #b0e0e6; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #001f3f; letter-spacing: 4px;">${text}</p>
    </div>
    <p style="font-size: 14px; color: #666;">
      This code is valid for 5 minutes. If you did not request this, please ignore this email.
    </p>
  `;

  const html = createHtmlTemplate(subject, bodyContent);

  try {
    await transporter.sendMail({
      from: `HealthQ <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/send-confirm-email", async (req, res) => {
  const { to, subject, details } = req.body;

  if (!to || !details) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields: to, details" });
  }

  const { title, patientName, doctorName, hospitalName, date, time } = details;

  const bodyContent = `
    <p style="margin: 0 0 20px; font-size: 16px; color: #333; line-height: 1.5;">
      Dear ${patientName || "Patient"},
    </p>
    <p style="margin: 0 0 25px; font-size: 16px; color: #333; line-height: 1.5;">
      Your appointment has been confirmed. Please see the details below.
    </p>
    <div style="background-color: #f9f9f9; border-left: 4px solid #007bff; padding: 15px 20px; margin-bottom: 25px;">
      <p style="margin: 8px 0; font-size: 16px;"><strong>Doctor:</strong> ${
        doctorName || "N/A"
      }</p>
      <p style="margin: 8px 0; font-size: 16px;"><strong>Hospital:</strong> ${
        hospitalName || "N/A"
      }</p>
      <p style="margin: 8px 0; font-size: 16px;"><strong>Date:</strong> ${
        date || "N/A"
      }</p>
      <p style="margin: 8px 0; font-size: 16px;"><strong>Time:</strong> ${
        time || "N/A"
      }</p>
    </div>
    <p style="font-size: 14px; color: #666;">
      If you have any questions or need to reschedule, please contact us through the application.
    </p>
  `;

  const html = createHtmlTemplate(title || subject, bodyContent);

  try {
    await transporter.sendMail({
      from: `HealthQ <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
