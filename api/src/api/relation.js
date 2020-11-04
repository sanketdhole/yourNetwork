const express = require("express");
const { body } = require("express-validator");

const RelationController = require("../controller/relation");

const router = new express.Router();

router.post(
  "/create",
  [
    body("user1._id").not().isEmpty(),
    body("user2._id").not().isEmpty(),
    body("type").not().isEmpty(),
  ],
  RelationController.createRelation
);

router.post(
  "/find",
  [
    body("user1").not().isEmpty(),
    body("user1._id").not().isEmpty(),
    body("user2").not().isEmpty(),
    body("user2._id").not().isEmpty(),
  ],
  RelationController.findRelation
);

module.exports = router;
