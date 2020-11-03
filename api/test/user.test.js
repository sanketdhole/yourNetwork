const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
let requestApp = request(app);

describe("User api test", () => {
  before(function () {
    /*
    Using the same connection and instance of app
    */
    return mongoose.connect("mongodb://localhost:27017/raftlabs", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  describe("GET /user/find", () => {
    it("responds with a user document", (done) => {
      requestApp
        .get("/user/find?name=sanket")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("POST /user/create", (done) => {
    it("responds with success after creating document", (done) => {
      requestApp
        .post("/user/create")
        .send({ name: "sanket" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
  });
});
