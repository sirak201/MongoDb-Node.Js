const Book = require("../models/Book")
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


router.get('/book' ,  async (req , res) => {
    const newBook = new Book({
      _id: new mongoose.Types.ObjectId(),
      bookName: 'Harry Potter',
      releaseDate: Date.now().toString()
    });
  
  
    const addedook = await newBook.save()
    res.json(addedook)
  
  })

  module.exports = router