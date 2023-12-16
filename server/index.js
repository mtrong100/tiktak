import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import helmet from "helmet";
import { connectMongoDb } from "./configs/dbConfig.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Use libs
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Connect MongoDB
connectMongoDb();

// Start server
app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});

// Apply api routes
app.use("/api/v1", routes);

// Error middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Sever Error";
  return res.status(statusCode).json({ message });
});
