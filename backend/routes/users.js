const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/users");
const { body } = require("express-validator");
const UserModel = require("../models/users");

router.put(
  "/signup",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username is required!"),
    body("email")
      .isEmail()
      .withMessage("Email is invalid!")
      .custom((value, { req }) => {
        //check if email is already taken
        return UserModel.findOne({ email: value }).then((userDoc) => {
          if (userDoc) return Promise.reject("Email already taken!");
        });
      }),
    body("password").trim().isLength({ min: 5 }),
  ],
  signUp
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email is invalid!"),
    body("password").trim().isLength({ min: 5 }),
  ],
  signIn
);

module.exports = router;
