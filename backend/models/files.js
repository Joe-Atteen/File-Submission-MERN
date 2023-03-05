const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FilesSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  screenshot: {
    data: Buffer,
    contentType: String,
  },
  link: {
    type: String,
    required: true,
  },
});

const FilesModel = mongoose.model("Files", FilesSchema);

module.exports = FilesModel;
