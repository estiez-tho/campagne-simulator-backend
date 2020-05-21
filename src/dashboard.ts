import { UserInfoModel, UserInfo } from "./user/model";

export async function getRankedPlayers(): Promise<
  Array<{ username: string; amount: number }>
> {
  const playerList: Array<UserInfo> = await new Promise((resolve, reject) => {
    UserInfoModel.find({}, { _id: 0 }).exec((err, res) => {
      if (err) reject(err);
      let mapped = res.map((elem) => updateScore(elem));
      mapped.sort((left, right) => {
        return right.amount > left.amount ? 1 : -1;
      });
      resolve(mapped);
    });
  });

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
