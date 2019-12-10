const express = require('express')
const app = express()
const mongoose = require('mongoose')

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

  var bookSchema = new mongoose.Schema({
    releaseDate: String,
    bookName: String

  });

  var Book = mongoose.model('Book', bookSchema);




app.get('/api/book' ,  async (req , res) => {


  const newBook = new Book({
    _id: new mongoose.Types.ObjectId(),
    bookName: 'Harry Potter',
    releaseDate: Date().now.toString
  });


  const addedook = await newBook.save()
  res.json(addedook)

})



mongoose.connect('mongodb://sirak201:sirak33@ds233288.mlab.com:33288/heroku_2d6v6ns6', options).then(
    () => { console.log("Connection sucesfull") },
    err => { console.log(err)}
  );



app.listen(3000, () => console.log('server started'))
