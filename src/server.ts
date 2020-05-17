import express, { Router, Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import userRouter from "./user/router";
import jwt from "express-jwt";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { JwtSecret } from "../config/secret";

const app: express.Application = express();

app.use(express.json());

app.use(cookieParser());

app.use(morgan());

app.use(
  jwt({ secret: JwtSecret }).unless({
    path: ["/status", "/user/create", "/user/verify"],
  })
);

app.get("/status", (req: Request, res: Response, next: NextFunction) => {
  return res.json({ status: "ok" });
});

app.use("/user", userRouter);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(createError(404, "This route does not exists"));
});

app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode);
  res.json({ status: "error", message: err.message });
});

export default app;
