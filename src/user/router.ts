import { Router, Request, Response, NextFunction } from "express";
import { getUserInfo, createUser } from "./controller";
import { UserCreationDataJoiSchema, UserInfoJoiSchema } from "./model";
import createError from "http-errors";
import { validateModel } from "../validation";
import { getUserCreationData } from "../utils";

const userRouter: Router = Router();

/**
 * GET ROUTES
 */
userRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
      const userInfo = await getUserInfo(userId);
      res.json(userInfo);
    } catch (err) {
      next(createError(404, new Error("did not find user in the db")));
    }
  }
);

/**
 * POST ROUTES
 */
userRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateModel(req.body, UserCreationDataJoiSchema);

      const dbCreationData = getUserCreationData(req.body);

      validateModel(dbCreationData, UserInfoJoiSchema);

      const createdUser = await createUser(dbCreationData);

      res.json(createdUser);
    } catch (err) {
      next(createError(400, err));
    }
  }
);

export default userRouter;
