const mongoose = require('mongoose')
const moment = require('moment')

const commentSchema = new mongoose.Schema ({
    comment : {
        type:String,
        required:true
    },
     createdAt:{
        type:Date,
        default:Date.now,
        get: function(createdAt){
             return moment(createdAt).format('MMMM Do YY , h:mm a')
       }
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Post',
       
    },

   
},
    { timestamps: true }
)
const Comment = mongoose.model('Comment' , commentSchema)
module.exports = Comment;
    