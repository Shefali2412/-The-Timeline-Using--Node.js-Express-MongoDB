const express = require('express')
const route = express.Router()
const postController = require('../controller/postController')
const commentController = require('../controller/commentController')
const authController = require('../controller/authController')
const auth = require('../middleware/auth')

// to control access of public & private pages we use authentication

route.get('/', auth.checkUserLogIn, authController.registerLoginPage)
route.post('/new-account',auth.isAuth, authController.register)
route.post('/login', auth.isAuth,  authController.login)
route.get('/post', auth.isLoggedInUser, authController.postpage)
route.get('/logout',authController.logOut)
route.get('/about', authController.aboutpage)

//Posts route 
route.post('/create-new-post/:userId', postController.createNewPost)
route.get('/all-posts',auth.isLoggedInUser, postController.showAllPosts)

route.get('/api-all-posts',auth.isLoggedInUser, postController.makeDataAsJson)

//comment route
route.post('/make-comment/:postId',auth.isLoggedInUser, postController.makeComment )


// route.post('/', postController.postMessage)
// route.get('/logout ',authController.logout)

// Create route for rendering the EJS file
// route.get('/', postController.getHomepage)

// Create route for posting a message
// route.post('/posts', authenticate , postController.postMessage)

// route.post("/posts/:postId/create-comment", authenticate , commentController.postComment);






module.exports = route