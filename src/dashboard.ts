import { UserInfoModel, UserInfo } from "./user/model";
import { UserItem } from "./userItem/model";

export async function getRankedPlayers(): Promise<
  Array<{ username: string; amount: number }>
> {
  const playerList = await UserInfoModel.find({}).lean();
  const updatedPlayerList = playerList.map((element) => {
    return updateScore(element);
  });

  updatedPlayerList.sort((left, right) =>
    right.amount > left.amount ? 1 : -1
  );

  return updatedPlayerList;
}

function updateScore(userInfo: UserInfo) {
  let { username, amount } = userInfo;
  let deltaAmount = 0;
  const items = userInfo.items;

  Object.values(items).forEach((item: UserItem) => {
    let {
      reward,
      quantity,
      duration,
      progression,
      progressionLastUpdated,
    } = item;

    const currentTime = new Date();

    progressionLastUpdated = new Date(progressionLastUpdated);

    const deltaTime = currentTime.getTime() - progressionLastUpdated.getTime();

    const numberOfCycles = Math.floor((progression + deltaTime) / duration);

    deltaAmount += quantity * reward * numberOfCycles;
  });
  amount = amount + deltaAmount;

  return {
    username,
    amount,
  };
}
