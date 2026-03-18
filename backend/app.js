import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//Routers import
import { Router } from "express";
import dataRouter from './routers/dataRouter.js'
import usersRouter from "./routers/usersRouter.js";


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json())


app.get("/", (req, res) => {
  res.send("HealthQ Backend is running");
});

app.use('/data', dataRouter);
app.use('/users', usersRouter);


const HOST = 'localhost'
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => console.log(`Running on ${HOST}:${PORT}`));
