import { Router, Request, Response } from "express";
import { getUserInfo } from "./controller";
const userRouter: Router = Router();

userRouter.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userInfo = await getUserInfo(userId);
  res.json(userInfo);
});

export default userRouter;
