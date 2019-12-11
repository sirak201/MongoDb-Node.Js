const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var podcastSchema = new mongoose.Schema({
  releaseDate: { type: Date, default: Date.now },
  podcastName: String,
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  length: Schema.Types.Decimal128
});

const Podcast = mongoose.model("Podcast", podcastSchema);
module.exports = Podcast;
