import { Item } from "../src/items/model";

export const ITEMS: { [id: string]: Item } = {
  "1": {
    name: "Item 1",
    price: 10,
    duration: 1000,
    quantity: 1,
    progression: 0,
    progressionLastUpdated: new Date("2020-05-08T14:23:50.791Z"),
  },
  "2": {
    name: "Item 2",
    price: 20,
    duration: 2000,
    quantity: 2,
    progression: 0,
    progressionLastUpdated: new Date("2020-05-08T14:23:50.791Z"),
  },
  "3": {
    name: "Item 3",
    price: 30,
    duration: 3000,
    quantity: 3,
    progression: 0,
    progressionLastUpdated: new Date("2020-05-08T14:23:50.791Z"),
  },
};
