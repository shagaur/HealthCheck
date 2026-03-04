import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// CookieParser
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorHandler);

export default app;
