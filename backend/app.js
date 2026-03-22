import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import db from "./config/db.js"; // ✅ เพิ่มตรงนี้

dotenv.config();

// Routers
import dataRouter from "./routers/dataRouter.js";
import usersRouter from "./routers/usersRouter.js";
import mailRouters from "./routers/mailRouters.js";
import userManageRouter from "./routers/userManageRouter.js";
import appointmentRouter from "./routers/appointmentRouter.js";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json()); // ❌ ไม่ต้องใช้ bodyParser แล้ว

const HOST = "localhost";
const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("HealthQ Backend is running");
});


// ✅ เพิ่ม: test DB
app.get("/test-db", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ message: "DB OK" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HealthQ Backend API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [{ url: `http://${HOST}:${PORT}` }],
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use("/data", dataRouter);
app.use("/users", usersRouter);
app.use("/userManage", userManageRouter);
app.use("/mail", mailRouters);
app.use("/appointment", appointmentRouter);


// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Running on http://${HOST}:${PORT}`);
});