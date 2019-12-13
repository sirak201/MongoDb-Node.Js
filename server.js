const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Routes
const podcastRoute = require("./routes/podcast");
const userRoute = require("./routes/user");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
};

app.use(bodyParser.json());
app.use("/api", podcastRoute); // Podcast Routes
app.use("/api", userRoute); // User Routes

mongoose.connect(process.env.DB_CONNECT, options).then(
  () => {
    console.log("Connection sucesfull");
  },
  err => {
    console.log(err);
  }
);

app.listen(3000, () => console.log("server started"));
