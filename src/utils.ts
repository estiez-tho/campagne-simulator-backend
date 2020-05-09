import { UserCreationData, UserInfo } from "./user/model";
import { UserItem } from "./userItem/model";
import { Items } from "../config/items";
export const getUserCreationData = (data: UserCreationData): UserInfo => {
  let items = {};
  for (let index = 0; index < Items.length; index++) {
    items[`${index}`] = {
      quantity: 0,
      progression: 0,
      progressionLastUpdated: new Date(),
    } as UserItem;
  }
  return { ...data, amount: 0, items };
};
