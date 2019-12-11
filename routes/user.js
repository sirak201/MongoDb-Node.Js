const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { userValidation } = require("../util/validation");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/user", async (req, res) => {
  const { error } = userValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const salt = await bcrypt.genSalt(saltRounds);

  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    fullName: req.body.fullName,
    password: hashPassword,
    username: req.body.username,
    email: req.body.email
  });

  try {
    const addedUser = await newUser.save();
    const savedUser = await User.findById(addedUser._id);
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
