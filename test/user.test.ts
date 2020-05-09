import request from "supertest";
import mongoose from "mongoose";
import app from "../src/server";

beforeAll(async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (mongoUrl) {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
});

afterAll(() => {
  mongoose.connection.close();
});

describe("/user endpoints", () => {
  let userId: string;

  // POST /user/create with required body
  it("Should create a user in the db and return the UserInfo", async () => {
    const payload = { username: "test", email: "test@gmail.com" };
    const res = await request(app).post("/user/create").send(payload);
    expect(res.statusCode).toEqual(200);
    userId = res.body._id;
  });

  // POST /user/create with invalid body
  it("Should create a user in the db and return the UserInfo", async () => {
    const res = await request(app).post("/user/create").send({});
    expect(res.statusCode).toEqual(400);
  });

  // GET /user/:id with id in the database
  it("Should return the UserInfo based on :userId", async () => {
    const res = await request(app).get(`/user/${userId}`);
    expect(res.statusCode).toEqual(200);
  });

  // GET /user/:id with unknown id
  it("Should return a 404 error", async () => {
    const res = await request(app).get(`/user/unknown`);
    expect(res.statusCode).toEqual(404);
  });
});
