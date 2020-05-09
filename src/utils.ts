import { UserCreationData, UserInfo } from "./user/model";
import { ITEMS } from "../mock/items";

export const getDbCreationData = (data: UserCreationData): UserInfo => {
  return { ...data, amount: 0, items: ITEMS };
};
