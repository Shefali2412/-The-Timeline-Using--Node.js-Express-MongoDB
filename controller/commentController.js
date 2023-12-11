const Comment = require('../models/commentModel')
const Post  = require('../models/postModel')

const postComment = async (req ,res) => {
    const{ postId } = req.params;
    const newComment = new Comment(req.body)
    await newComment.save()
    const thePost= await Post.findById(postId)
    thePost.comments.push(newComment)
    await thePost.save()
    res.redirect('/')
}

module.exports = {
    postComment
}