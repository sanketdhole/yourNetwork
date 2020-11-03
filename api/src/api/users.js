const express = require("express");

const user = require("../models/user");

const router = new express.Router();

router.get("/find", (req, res, next) => {
  /*
    Route:
      GET /user/find
    Query:
      name - name of user to search
    Response:
      Type - application/json
      body - user object 
  */
});

router.post("/create", (req, res, next) => {
  /*
  Route:
    POST /user/create
  Request:
    Type - application/json
    name - users name to be created
  Response:
    Type - application/json
    body - success or error response
  */
});

module.exports = router;
