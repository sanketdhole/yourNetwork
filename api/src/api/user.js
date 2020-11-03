const express = require("express");
const { query, body } = require("express-validator");

const userController = require("../controller/user");

const router = new express.Router();

router.get(
  "/find",
  [query("name").not().isEmpty().trim().withMessage("Name Field is empty")],
  userController.getUser
);

router.post(
  "/create",
  [body("name").not().isEmpty().trim().withMessage("Name Field is empty")],
  userController.createUser
);

module.exports = router;
