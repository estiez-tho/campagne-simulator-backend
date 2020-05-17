import { Router, Request, Response, NextFunction } from "express";
import {
  getUserInfo,
  createTempUser,
  updateUserInfo,
  verifyTempUser,
  createUser,
  deleteUserInfo,
} from "./controller";
import {
  UserCreationDataJoiSchema,
  UserVerificationDataJoiSchema,
  UserCreationData,
  UserInitInfoJoiSchema,
} from "./model";
import createError from "http-errors";
import { validateModel } from "../validation";
import {
  getUserInfoCreationData,
  formatUserInfoForResponse,
  formatTempUserInfoForResponse,
  getJwtToken,
  formatUserCreationInfoForResponse,
} from "../utils";

const userRouter: Router = Router();

export interface JwtProtectedResponse extends Request {
  user: {
    username: string;
    userId: string;
  };
}

/**
 * GET ROUTES
 */
userRouter.get(
  "/:userId",
  async (req: JwtProtectedResponse, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const tokenUserId = req.user.userId;
    if (userId !== tokenUserId) return next(createError(401, "Wrong token"));
    try {
      const userInfo = await getUserInfo(userId);
      res.json(formatUserInfoForResponse(userInfo));
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

      const createdTempUser = await createTempUser(req.body);

      res.json(formatTempUserInfoForResponse(createdTempUser));
    } catch (err) {
      next(createError(400, err));
    }
  }
);

userRouter.post(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateModel(req.body, UserVerificationDataJoiSchema);

      const tempUser = await verifyTempUser(req.body);

      const { username, email } = tempUser;

      const userCreationData = getUserInfoCreationData({
        username,
        email,
      } as UserCreationData);

      validateModel(userCreationData, UserInitInfoJoiSchema);

      const createdUser = await createUser(userCreationData);

      const userId = createdUser._id;
      const jwtToken = getJwtToken(username, userId);

      res.json(formatUserCreationInfoForResponse(createdUser, jwtToken));
    } catch (err) {
      console.log(err);
      next(createError(400, err));
    }
  }
);

userRouter.post(
  "/:userId",
  async (req: JwtProtectedResponse, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const tokenUserId = req.user.userId;
    if (userId !== tokenUserId) return next(createError(401, "Wrong token"));
    try {
      res.json(
        formatUserInfoForResponse(await updateUserInfo(userId, req.body))
      );
    } catch (err) {
      next(createError(400, err));
    }
  }
);

/**
 * DELETE ROUTES
 */

userRouter.delete(
  "/:userId",
  async (req: JwtProtectedResponse, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const tokenUserId = req.user.userId;
    if (userId !== tokenUserId) return next(createError(401, "Wrong token"));
    try {
      await deleteUserInfo(userId);
      res.json({ status: "deleted" });
    } catch (err) {
      next(createError(400, err));
    }
  }
);

export default userRouter;
