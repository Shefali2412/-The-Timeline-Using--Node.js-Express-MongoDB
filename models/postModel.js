const mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new mongoose.Schema(
  {
  post: { 
    type: String, 
    required: true, 
    // minLength: 25 
  },
  createdAt: { type: Date, 
    default: Date.now ,
    get: function (createdAt) {
      return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
  }
},
comments:[{
  type:mongoose.Schema.Types.ObjectId,
  ref : 'Comment'
  
}],

owner: {   // relationship between user & post is one to one
  type: mongoose.Schema.Types.ObjectId,
  ref : 'User'

}
  

  });


module.exports = mongoose.model('Post', postSchema);