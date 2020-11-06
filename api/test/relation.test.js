const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const User = require("../src/models/user");
let requestApp = request(app);
let user1;
let user2;

describe("Relationship api test", () => {
  before(async () => {
    /*
      Using the same database connection and instance of app
      for all tests of relation api
    */
    await mongoose.connect("mongodb://localhost:27017/raftlabs", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useFindAndModify", false); // to remove the warning
    await User.deleteMany({});
    user1 = await User.create({ name: "sanket", relations: [] });
    user2 = await User.create({ name: "arpit", relations: [] });
  });

  describe("POST /relation/create", () => {
    it("response with 200 status code", (done) => {
      requestApp
        .post("/relation/create")
        .send({
          user1,
          user2,
          type: "friend",
        })
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, { result: "Relation mapped!" }, done);
    });
  });

  describe("POST /relation/find", () => {
    it("response with list of users between two users", (done) => {
      requestApp
        .post("/relation/find")
        .send({
          user1,
          user2,
        })
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});
