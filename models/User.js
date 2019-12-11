const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  podcastAmount: {
    type: Number,
    default: 0
  },
  birthDate: Date,
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
