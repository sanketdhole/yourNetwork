const express = require("express");

const User = require("../models/user");

const util = require("../utils/relationutils.js");

const router = new express.Router();

router.post("/create", (req, res, next) => {
  /*
  Route:
    POST /relation/create
  Request:
    Type - application/json
    user1 - user object
    user2 - user object
    type - relation type
  Response:
    Type - application/json
    body - success or error response
  */
});

router.post("/find", (req, res, next) => {
  /*
  Route:
    POST /relation/find
  Request:
    Type - application/json
    user1 - user object
    user2 - user object
  Response:
    Type - application/json
    body - list of users from user1 to user2 relations
  */
  // using the bi-directional breath first search to find the shorted path
  // then return the list of all the users from user1 to user2 in that path
});

module.exports = router;
