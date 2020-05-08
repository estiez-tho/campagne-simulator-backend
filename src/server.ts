import express, { Router, Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import userRouter from "./user/router";

const app: express.Application = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
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
