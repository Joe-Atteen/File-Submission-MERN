const express = require("express");
const router = express.Router();
const {
  listFiles,
  createFiles,
  updateFiles,
  deleteFiles,
} = require("../controllers/files");
const { body } = require("express-validator");
const FilesModel = require("../models/files");
const Auth = require("../middleware/auth");

router.get("/files/:id?", Auth, listFiles);
router.post(
  "/files",
  Auth,
  [
    body("topic")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This input field can't be empty.")
      .custom((value, { req }) => {
        return FilesModel.findOne({ topic: value }).then((filesDoc) => {
          if (filesDoc) {
            return Promise.reject("Sorry! Topic already taken.");
          }
        });
      }),
    body("screenshot")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This input field can't be empty."),
    body("link")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This input field can't be empty."),
  ],
  createFiles
);
router.put("/files", Auth, updateFiles);
router.delete("/files/:id", Auth, deleteFiles);

module.exports = router;
