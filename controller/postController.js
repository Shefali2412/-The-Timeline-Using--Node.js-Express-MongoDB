const Post = require("../models/postModel")
const Comment = require('../models/commentModel')
// const Comment = require ('../models/commentModel')
// const authenticate = require('../middleware/auth.js');

// // get homepage with all posts
// const getPostpage = async (req, res) => {
//         try {
//           // Fetch all posts from the database
//           const posts = await Post.find({})
//           .populate("comments", "comment")
//           .sort({ createdAt: -1 });
      
//           // Render the EJS file with the posts data
//           res.render('posts', { posts , err: ""});
//         } catch (err) {
//           console.error(err);
//           res.status(500).send('Something went wrong.');
//         }
//       };

// post message 
  const createNewPost =  (req, res) => { 
    console.log(req.body);
    console.log(req.params); // it will give me userid 
    let postData = {
      post: req.body.post,
      owner: req.params.userId //post id 
    }

    let newPost = new Post(postData); 
    newPost.save()
        .then(() => {
          res.redirect('/all-posts')
        }) 
        .catch( err => {
          console.log(err);
        })
    //console.log(newPost)


    // const { name, message } = req.body;
    
    // try {
    //     if (message.length < 25) {
    //       const posts = await Post.find({}).sort({ createdAt: -1 });
    //       return res.render("posts", {
    //         posts,
    //         err: "Message must be longer than 25 characters."
    //       });
    //     }
    //    const post = new Post(req.body); 
    //     await post.save();
    //     // res.redirect("/");
    //   } catch (err) {
    //     console.log(err);
    //     res.status(500).send('Something went wrong.');
    //   }
     };

  const showAllPosts  =  (req, res) => {
    Post.find()
        .populate("owner", "username email") // populate will change all user id with user information or what ever data present in owner it will show in second para tells what we want to show from owner
        .populate("comments", "comment")     
        .sort({ createdAt: -1 })
        .then((result) => {
          //console.log(result)
          res.render('allPosts', { posts: result})
        })
        .catch(err => {
          console.log(err)
        })
    
  } 

  const makeComment = (req ,res) => {
    const{ postId } = req.params;
    const newComment = new Comment(req.body)
    newComment.save()
          .then(() => {
             return Post.findById(postId).populate("user", "username")

             
         })
          .then((thePost) => {
              thePost.comments.push(newComment);
          
               return thePost.save();
      })
          .then(() => {
        // Redirect to the same page after making the comment
              res.redirect('/all-posts');
       })
          .catch((error) => {
             console.log(error);
            res.status(500).send('Something went wrong.');
      });
}; 
   
   

  const makeDataAsJson = (req, res) => {   //creating my api

    Post.find().populate("owner", "username email") 
        .sort({ createdAt: -1 })
        .then((result) => {
          //console.log(result)
          res.send(result)
        })
        .catch(err => {
          console.log(err)
        })
      
  }


    









module.exports = {
    // getPostpage,
    createNewPost,
    showAllPosts,
    makeComment,
    makeDataAsJson
}


