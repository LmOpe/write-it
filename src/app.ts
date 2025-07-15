import { Request, Response } from "express";
import routes from "./routes/index";
import { swaggerSpec } from "./docs/swagger";

const swaggerUi = require("swagger-ui-express");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API is running!" });
});

export default app;
