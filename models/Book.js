const mongoose = require('mongoose')


var bookSchema = new mongoose.Schema({
    releaseDate: String,
    bookName: String

  });

  
const Book = mongoose.model('Book', bookSchema);;
module.exports = Book