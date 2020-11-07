const { validationResult } = require("express-validator");

const User = require("../models/user");
const Relation = require("../models/relation");
const findPath = require("../utils/findpath");

const util = require("../utils/relation.js");

module.exports.createRelation = (req, res, next) => {
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
  let error = validationResult(req);
  if (!error.isEmpty()) {
    next(new Error(error.errors[0].msg));
    return;
  }
  Relation.findOneAndUpdate(
    { userId: req.body.user1._id },
    {
      $addToSet: {
        relations: { user: req.body.user2._id, type: req.body.type },
      },
    }
  )
    .then(() => {
      let oppositeRelation = util.findOppositeRelation(req.body.type);
      return Relation.findOneAndUpdate(
        { userId: req.body.user2._id },
        {
          $addToSet: {
            relations: {
              user: req.body.user1._id,
              type: oppositeRelation,
            },
          },
        }
      );
    })
    .then(() => {
      res.status(201).json({ result: "Relation mapped!" });
    })
    .catch(next);
};

module.exports.findRelation = (req, res, next) => {
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
  let user1 = req.body.user1._id;
  let user2 = req.body.user2._id;
  let order = null;
  findPath(user1, user2)
    .then((path) => {
      order = path;
      return User.find({
        _id: { $in: path },
      });
    })
    .then((userDocumensts) => {
      res.json({ path: userDocumensts, orderIds: order });
    })
    .catch((error) => {
      res.statsCode = 404;
      res.json({ path: "No Path Found" });
    });
};
