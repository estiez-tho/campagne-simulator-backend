import {
  UserCreationData,
  UserInfo,
  TempUser,
  UserInitInfo,
} from "./user/model";
import { UserItem } from "./userItem/model";
import { Items } from "../config/items";
import jwt from "jsonwebtoken";
import { JwtSecret } from "../config/secret";

export function getUserInfoCreationData(data: UserCreationData): UserInitInfo {
  let items = {};
  for (let index = 0; index < Items.length; index++) {
    const name = Items[index].name;
    const price = Items[index].initialPrice;
    const duration = Items[index].initialDuration;
    const reward = Items[index].initialReward;
    items[`${index}`] = {
      name,
      price,
      duration,
      reward,
      quantity: 0,
      progression: 0,
      progressionLastUpdated: new Date(),
      nextGoal: 3,
      numberOfReachedGoal: 0,
    } as UserItem;
  }
  return { ...data, amount: 10, items, verified: false };
}

export function formatUserInfoForResponse(userInfo: UserInfo) {
  return userInfo;
}

export function formatTempUserInfoForResponse(tempUser: TempUser) {
  const { email } = tempUser;
  return { email };
}

export function formatUserCreationInfoForResponse(
  user: UserInfo,
  token: string
) {
  return { user, token };
}

export function getRandomCode(length: number): string {
  const charSet = "0123456789ABCDEFG";
  const nbOfChars = charSet.length - 1;
  let res = "";
  let index;
  for (let i = 0; i < length; i++) {
    index = Math.floor(Math.random() * nbOfChars);
    res += charSet[index];
  }
  return res;
}

export function getJwtToken(username: string, userId: string): string {
  return jwt.sign({ username, userId }, JwtSecret);
}
