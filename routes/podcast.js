const Podcast = require("../models/Podcast")
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


router.get('/podcast' ,  async (req , res) => {

    const podcasts = await Podcast.find()
    res.json(podcasts)
  })

router.post('/podcast' ,  async (req , res) => {
      
    const newPodcast = new Podcast({
      podcastName: req.body.podcastName,
      owner: req.body.owner,
      length : req.body.length,
    });
  
    const addedPodcast = await newPodcast.save()
    res.json(addedPodcast)
  
  })

  module.exports = router