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
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

app.use(bodyParser.json());
app.use("/api", podcastRoute);
app.use("/api", userRoute);

mongoose.connect(process.env.DB_CONNECT, options).then(
  () => {
    console.log("Connection sucesfull");
  },
  err => {
    console.log(err);
  }
);

app.listen(3000, () => console.log("server started"));
