import { UserInfo, UserCreationData, UserInfoModel } from "./model";

// GET routes
export async function getUserInfo(id: string): Promise<UserInfo> {
  return await UserInfoModel.findById(id);
}

// POST routes
export async function createUser(data: UserInfo): Promise<UserInfo> {
  return await UserInfoModel.create(data);
}
