import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import db from "./config/db.js";

dotenv.config();

// --- Routers ---
import dataRouter from "./routers/dataRouter.js";
import usersRouter from "./routers/usersRouter.js";
import mailRouters from "./routers/mailRouters.js";
import userManageRouter from "./routers/userManageRouter.js";
import appointmentRouter from "./routers/appointmentRouter.js";

const app = express();

// --- Middleware ---
app.use(cors({ origin: "*" }));
app.use(express.json()); 

const HOST = "localhost";
const PORT = process.env.PORT || 3000;

// --- Routes ---

// 1. Test route
app.get("/", (req, res) => {
  res.send("HealthQ Backend is running");
});

// 2. Test DB Connection
app.get("/test-db", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ message: "Database connection is OK" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Swagger API Documentation ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HealthQ Backend API",
      version: "1.0.0",
      description: "API Documentation for HealthQ system",
    },
    servers: [{ url: `http://${HOST}:${PORT}` }],
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API Endpoints ---
app.use("/data", dataRouter);
app.use("/users", usersRouter);
app.use("/userManage", userManageRouter);
app.use("/mail", mailRouters);
app.use("/appointment", appointmentRouter);

// --- Start Server ---
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Swagger Docs: http://${HOST}:${PORT}/api-docs`);
});