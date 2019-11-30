const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const Search = new Schema({
  content: {
    type: String,
    required: true
  },
  counter: {
    type: Number,
    required: true
  }
});
const search = mongoose.model("Search", Search);
module.exports = search;
