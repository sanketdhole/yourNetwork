const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
let requestApp = request(app);

describe("User api test", () => {
  before(function () {
    /*
    Using the same connection and instance of app
    */
    return mongoose.connect(process.env.TEST_DB, {
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

  describe("GET /user/find", () => {
    it("responds with error message", (done) => {
      requestApp
        .get("/user/find?name=unlistedname")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
  });

  describe("POST /user/create", () => {
    it("responds with success after creating document", (done) => {
      requestApp
        .post("/user/create")
        .send({ name: "sanket" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
  });

  describe("POST /user/create", () => {
    it("responds with 400 bad request", (done) => {
      requestApp
        .post("/user/create")
        .send({ randomKey: "randomValue" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
  });
});
