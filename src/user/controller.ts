import {
  UserInfo,
  UserInfoModel,
  TempUserModel,
  TempUser,
  UserCreationData,
  UserVerificationData,
} from "./model";

import { sendVerificationCode } from "../mail";
import { getRandomCode } from "../utils";

// GET routes
export async function getUserInfo(id: string): Promise<UserInfo> {
  return await UserInfoModel.findById(id);
}

// POST routes
export async function createTempUser(
  userCreationData: UserCreationData
): Promise<TempUser> {
  try {
    const { username, email } = userCreationData;
    const usernameAlreadyTaken = await UserInfoModel.exists({
      username,
    });

    if (usernameAlreadyTaken) throw new Error("Username already exists");

    const emailAlreadyTaken = await UserInfoModel.exists({
      email,
    });

    if (emailAlreadyTaken) throw new Error("Email already taken");

    const verificationCode = getRandomCode(5);
    const userInfo = await TempUserModel.create({
      email,
      verificationCode,
      username,
    });

    await sendVerificationCode(email, verificationCode);

    return userInfo;
  } catch (err) {
    console.log(err);
    throw new Error("Could not create user in Database");
  }
}

export async function verifyTempUser(
  data: UserVerificationData
): Promise<TempUser> {
  const { email, verificationCode } = data;
  const tempUser = await TempUserModel.findOne({ email });
  if (!tempUser) throw new Error("Could not find temp user");
  if (verificationCode !== tempUser.verificationCode)
    throw new Error("Could not find temp user");
  await TempUserModel.deleteMany({ email });
  return tempUser;
}

export async function createUser(data: UserInfo): Promise<UserInfo> {
  return await UserInfoModel.create(data);
}

export async function updateUserInfo(id: string, data: any): Promise<UserInfo> {
  let user = await UserInfoModel.findById(id);

  if (!user) throw new Error("Could not find user");

  user.amount = data.amount;
  user.items = data.items;

  return await user.save();
}
