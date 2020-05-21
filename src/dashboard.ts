import { UserInfoModel, UserInfo } from "./user/model";
import { UserItem } from "./userItem/model";

export async function getRankedPlayers(): Promise<Array<string>> {
  const playerList = await UserInfoModel.find().exec((err, res) => {
    console.log(JSON.stringify(res));
    let mapped = res.map((elem) => updateScore(elem));
    mapped.sort((left, right) => {
      return right.amount > left.amount ? 1 : -1;
    });
    return mapped;
  });
  return playerList;
}

function updateScore(userInfo: UserInfo) {
  console.log(`
  
  USER INFO : 


  ${JSON.stringify(userInfo)}
  
  
  
  
  `);
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
  });
  amount = amount + deltaAmount;
  return {
    username,
    amount,
  };
}
