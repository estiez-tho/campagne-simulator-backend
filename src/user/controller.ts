import { UserInfo, UserCreationData, UserInfoModel } from "./model";
import { getDbCreationData } from "../utils";
import mongoose from "mongoose";

// GET routes
export async function getUserInfo(id: string): Promise<UserInfo> {
  return await UserInfoModel.findById(id);
}

// POST routes
export async function createUser(data: UserInfo): Promise<UserInfo> {
  return await UserInfoModel.create(data);
}
