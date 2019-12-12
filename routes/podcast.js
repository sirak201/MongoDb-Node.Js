const Podcast = require("../models/Podcast");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../util/verifyToken");
const { podcastValidate } = require("../util/validation");

router.get("/podcast", async (req, res) => {
  const podcasts = await Podcast.find();
  res.json(podcasts);
});

router.post("/podcast", auth, async (req, res) => {
  const { error } = podcastValidate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const newPodcast = new Podcast({
    podcastName: req.body.podcastName,
    owner: req.user.userId,
    length: req.body.length
  });

  const addedPodcast = await newPodcast.save();
  res.json(addedPodcast);
});

module.exports = router;
