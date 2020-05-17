import {
  UserInfo,
  UserInfoModel,
  TempUserModel,
  TempUser,
  UserCreationData,
  UserVerificationData,
  UserInitInfo,
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
    await TempUserModel.deleteMany({ email });
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
  if (verificationCode !== tempUser.verificationCode) {
    console.log(verificationCode);
    console.log(tempUser.verificationCode);
    throw new Error("Wrong verification code");
  }
  await TempUserModel.deleteMany({ email });
  return tempUser;
}

export async function createUser(data: UserInitInfo): Promise<UserInfo> {
  const createdUser = await UserInfoModel.create(data);
  return createdUser;
}

export async function updateUserInfo(id: string, data: any): Promise<UserInfo> {
  let user = await UserInfoModel.findById(id);

  if (!user) throw new Error("Could not find user");

  user.amount = data.amount;
  user.items = data.items;

  return await user.save();
}

export async function deleteUserInfo(_id: string): Promise<void> {
  await UserInfoModel.deleteOne({ _id });
}
