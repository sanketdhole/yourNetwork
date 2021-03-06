const { validationResult } = require("express-validator");

const User = require("../models/user");
const Relation = require("../models/relation");

module.exports.findUserByName = (req, res, next) => {
  /*
    Route:
      GET /user/find
    Query:
      name - name of user to search
    Response:
      Type - application/json
      body - user object 
  */
  let error = validationResult(req);
  if (!error.isEmpty()) {
    next(new Error(error.errors[0].msg));
    return;
  }
  User.findOne({ name: req.query.name }, (err, user) => {
    if (err || user == null) {
      res.statusCode = 404;
      next(new Error("User not Found"));
    } else {
      res.json(user);
    }
  });
};

module.exports.createUser = (req, res, next) => {
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
  let error = validationResult(req);
  if (!error.isEmpty()) {
    res.statusCode = 400;
    next(new Error(error.errors[0].msg));
    return;
  }
  User.findOne({ name: req.body.name }).then((result, err) => {
    if (result == null) {
      User.create({ name: req.body.name })
        .then((result, err) => {
          return Relation.create({ userId: result._id, relations: [] });
        })
        .then((result, err) => {
          res.status(201).json({ result: "User Creation successful!" });
        })
        .catch(next);
    } else {
      res.status(400).json({ result: "User Already Exists" });
    }
  });
};
