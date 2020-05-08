import { UserInfo } from "./model";
import { USER_INFO } from "../../mock/user";

export async function getUserInfo(userId: string): Promise<UserInfo> {
  return USER_INFO;
}
