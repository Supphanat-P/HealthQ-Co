import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//Routers import
import { Router } from "express";
import dataRouter from './routers/dataRouter.js'
import mailRouters from "./routers/mailRouters.js";


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));


app.get("/", (req, res) => {
  res.send("HealthQ Backend is running");
});

app.use('/data', dataRouter);
app.use('/mail', mailRouters);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on ${port}`));
