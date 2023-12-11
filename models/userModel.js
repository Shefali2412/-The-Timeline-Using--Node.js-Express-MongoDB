const mongoose = require('mongoose');
// const userId = require('mongoose').Types.ObjectId;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true,
  },
   email: {
    type: String,
    required: false,
    unique: true
  },
  
  password: {
    type: String,
    required: false,
  },

  posts: [{    // relation between user & post is one to many(array)
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Post'

  }]
  
});


module.exports = mongoose.model('User', userSchema);