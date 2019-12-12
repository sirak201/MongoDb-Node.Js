const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var podcastSchema = new mongoose.Schema({
  releaseDate: { type: Date, default: Date.now },
  podcastName: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  length: Number
});

const Podcast = mongoose.model("Podcast", podcastSchema);
module.exports = Podcast;
