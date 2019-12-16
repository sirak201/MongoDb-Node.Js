const Podcast = require("../models/Podcast");
const express = require("express");
const auth = require("../util/verifyToken");
const { podcastValidate } = require("../util/validation");
const router = express.Router();

// Get all Podcast
router.get("/podcast", async (req, res) => {
  const podcasts = await Podcast.find().populate("owner");
  res.status(200).json(podcasts);
});

router.get("/podcast/:type", async (req, res) => {
  const type = req.params.type;

  const podcasts = await Podcast.find({ type: type }).populate("owner");
  res.status(200).json(podcasts);
});

// Create a Podcast
router.post("/podcast", auth, async (req, res) => {
  const { error } = podcastValidate(req.body);

  console.log(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const newPodcast = new Podcast({
    podcastName: req.body.podcastName,
    owner: req.user.userId,
    length: req.body.length,
    imageUrl: req.body.imageUrl,
    type: req.body.type
  });

  const addedPodcast = await newPodcast.save();
  res.status(200).json(addedPodcast);
});

module.exports = router;
