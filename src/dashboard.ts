import { UserInfoModel, UserInfo } from "./user/model";

export async function getRankedPlayers(): Promise<
  Array<{ username: string; amount: number }>
> {
  const playerList = UserInfoModel.find({}, { _id: 0, username: 1, amount: 1 })
    .sort({ amount: -1 })
    .limit(20);

  return playerList;
}

function updateScore(userInfo: UserInfo) {
  let { username, amount } = userInfo;
  let deltaAmount = 0;
  const items = { ...userInfo.items };
  const itemsKeys = Object.keys(items);
  console.log(JSON.stringify(items));
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
