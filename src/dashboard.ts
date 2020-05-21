import { UserInfoModel, UserInfo } from "./user/model";
import { UserItem } from "./userItem/model";

export async function getRankedPlayers(): Promise<
  Array<{ username: string; amount: number }>
> {
  const playerList: Array<UserInfo> = await UserInfoModel.find();
  let mapped = playerList.map((elem) => updateScore(elem));

  mapped.sort((left, right) => {
    return right.amount > left.amount ? 1 : -1;
  });
  return mapped;
}

function updateScore(userInfo: UserInfo) {
  let { username, amount } = userInfo;
  let deltaAmount = 0;
  const items = { ...userInfo.items };
  const itemsKeys = Object.keys(items).filter((elem) => !isNaN(elem));
  itemsKeys.forEach((id: string) => {
    console.log(items[id]);
    let {
      reward,
      quantity,
      duration,
      progression,
      progressionLastUpdated,
    } = items[id];

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
