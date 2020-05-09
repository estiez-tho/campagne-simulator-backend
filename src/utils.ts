import { UserCreationData, UserInfo } from "./user/model";
import { UserItem } from "./userItem/model";
import { Items } from "../config/items";

export function getUserCreationData(data: UserCreationData): UserInfo {
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
    } as UserItem;
  }
  return { ...data, amount: 0, items };
}
