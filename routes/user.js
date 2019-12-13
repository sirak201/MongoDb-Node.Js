const User = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const auth = require("../util/verifyToken");
const { userValidation, loginValidation } = require("../util/validation");

//Get Users
router.get("/users", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Create a new user
router.post("/user", async (req, res) => {
  const { error } = userValidation(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  // Hasing the password
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    fullName: req.body.fullName,
    password: hashPassword,
    username: req.body.username,
    email: req.body.email
  });

  try {
    // Save User in the database
    const addedUser = await newUser.save();
    const savedUser = await User.findById(addedUser._id);
    res.json(savedUser);
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  console.log("I am being called", req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    //Checking if users exist
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ error: "Invalid Emial or Password" });
    // Checking if the password is correct
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      return res.status(400).json({ error: "Invalid Emial or Password" });

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token);
    res.json({ auth_token: `${token}` });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
