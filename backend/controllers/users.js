const UserModel = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: errors.array()[0].msg });
  }

  const { username, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const users = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      users
        .save()
        .then((user) => {
          res.json({
            message: "Sign up successful",
            data: { username: user.username, email: user.email },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const signIn = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    //find email/user in db
    const user = await UserModel.findOne({ email });

    if (!user) return res.json({ message: "User not found!" });

    //compare passwords
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      return res.json({ message: "Email or password incorrect!" });
    }

    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      "secretkey",
      { expiresIn: "30days" }
    );

    res.json({ message: "User signed in.", token });
  } catch (error) {
    res.json({ message: "Server error. Please try again!" });
  }
};

module.exports = { signUp, signIn };
