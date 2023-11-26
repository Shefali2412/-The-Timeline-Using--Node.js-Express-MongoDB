const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true, minLength: 25 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);