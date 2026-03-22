import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
dotenv.config();

//Routers import
import dataRouter from "./routers/dataRouter.js";
import usersRouter from "./routers/usersRouter.js";
import mailRouters from "./routers/mailRouters.js";
import userManageRouter from "./routers/userManageRouter.js";
import { version } from "react";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json());

const host = "localhost";
const port = 3000;

app.get("/", (req, res) => {
  res.send("HealthQ Backend is running");
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HealthQ Backend API Documention",
      version: "1.0.0",
      description: "This is API Backend Document",
    },
    servers: [{ url: `http://${host}:${port}`, description: "local server" }],
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/data", dataRouter);
app.use("/users", usersRouter);
app.use("/userManage", userManageRouter);
app.use("/mail", mailRouters);

const HOST = "localhost";
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => console.log(`Running on ${HOST}:${PORT}`));
