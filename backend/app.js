const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const filesRoute = require("./routes/files");

//CONFIGURATIONS
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

//ROUTES
app.use(userRoute);
app.use(filesRoute);

//CONNECTION TO DB AND LISTENING TO SERVER
mongoose.set("strictQuery", true);

const port = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log(`Server ready at ${port}`);
  });
});
