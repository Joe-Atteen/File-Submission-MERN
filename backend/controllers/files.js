const FilesModel = require("../models/files");
const { validationResult } = require("express-validator");

//fetch files
const listFiles = (req, res) => {
  const { id } = req.params;

  if (id) {
    FilesModel.find({ _id: id })
      .then((files) => {
        res.json({ data: files });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    FilesModel.find()
      .then((files) => {
        res.json({ data: files });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//create files
const createFiles = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: errors.array()[0].msg });
  }

  const { topic, screenshot, link } = req.body;

  const files = new FilesModel({
    topic,
    screenshot,
    link,
  });

  files
    .save()
    .then((result) => {
      res.json({ message: "files created successfully", data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update filess
const updateFiles = (req, res) => {
  const { id, topic, screenshot, link } = req.body;

  FilesModel.findById({ _id: id })
    .then((files) => {
      if (files) {
        files.topic = topic;
        files.screenshot = screenshot;
        files.link = link;

        files.save();

        res.json({ message: "files updated successfully", data: files });
      }
      res.json({ message: "files cannot be found" });
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete filess
const deleteFiles = (req, res) => {
  const { id } = req.params;
  FilesModel.findByIdAndDelete(id).then((deletedfiles) => {
    if (deletedfiles) {
      res.json({ message: "files deleted!", data: deletedfiles });
      return;
    }
    res.json({ message: "File not found!" });
  });
};

module.exports = {
  listFiles,
  createFiles,
  updateFiles,
  deleteFiles,
};
