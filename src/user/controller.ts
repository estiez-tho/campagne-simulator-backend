import { UserInfo, UserInfoModel } from "./model";
import { ItemPurchase } from "../userItem/model";
// GET routes
export async function getUserInfo(id: string): Promise<UserInfo> {
  return await UserInfoModel.findById(id);
}

// POST routes
export async function createUser(data: UserInfo): Promise<UserInfo> {
  return await UserInfoModel.create(data);
}

export async function addPurchases(
  id: string,
  purchases: Array<ItemPurchase>
): Promise<UserInfo> {
  const user = await UserInfoModel.findById(id);
  if (!user) throw new Error("Could not find user");
  purchases.forEach((elem) => {
    user.items.get(`${elem.itemId}`).quantity += 1;
  });
  return await user.save();
}
