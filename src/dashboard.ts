import { UserInfoModel } from "./user/model";

export async function getRankedPlayers(): Promise<Array<string>> {
  const playerList = await UserInfoModel.find()
    .select({ username: 1, amount: 1 })
    .sort({ amount: 1 });
  return playerList;
}
