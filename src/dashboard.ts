import { UserInfoModel, UserInfo } from "./user/model";
import { UserItem } from "./userItem/model";

export async function getRankedPlayers(): Promise<Array<string>> {
  const playerList = await UserInfoModel.find().then((res) => {
    let mapped = res.map(updateScore);
    mapped.sort((left, right) => {
      return right.amount > left.amount ? 1 : -1;
    });
    return mapped;
  });
  return playerList;
}

function updateScore(userInfo: UserInfo) {
  let { username, amount } = userInfo;
  let deltaAmount = 0;
  Object.values(userInfo.items).forEach((item: UserItem) => {
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
    console.log("ITEM");
    console.log(JSON.stringify(item));
    console.log("DELTA AMOUNT");
    console.log(deltaAmount);
  });
  amount = amount + deltaAmount;
  console.log("AMOUNT");
  console.log(amount);
  return {
    username,
    amount,
  };
}
