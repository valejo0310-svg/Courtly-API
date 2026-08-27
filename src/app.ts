import express from "express";
import { healthRouter } from "./routers/health.routes";

export const app = express();
app.use(express.json());

app.use('/api/health', healthRouter)