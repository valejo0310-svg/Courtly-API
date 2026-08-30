import express from "express";
import { healthRouter } from "./routers/health.routes";
import { courtRouter } from "./routers/court.routes";
import { userRouter } from "./routers/auth.routes";

export const app = express();
app.use(express.json());

app.use('/api/health', healthRouter)
app.use('/api/courts',courtRouter)
app.use ('/api/auth', userRouter)