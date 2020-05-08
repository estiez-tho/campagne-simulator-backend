import request from "supertest";
import app from "../src/server";
import { USER_INFO } from "../mock/user";

describe("/user endpoints", () => {
  it("should return ", async () => {
    const res = await request(app).get("/user/id");
    Object.keys(USER_INFO.items).forEach((itemId) => {
      res.body.items[itemId].progressionLastUpdated = new Date(
        res.body.items[itemId].progressionLastUpdated
      );
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(USER_INFO);
  });
});
