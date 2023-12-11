const express = require('express');
const app = express();
require('dotenv').config();


const route = require("./config/routes")
require("./config/mongoose")
const cookieParser = require('cookie-parser')

app.use(cookieParser())



// Serve static files (CSS, JS) from the public directory
app.use(express.static('public'));

const port = process.env.PORT;

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Parse JSON and handle URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route)





// // Create route for posting a message
// app.post('/posts', async (req, res) => {
//   const { name, message } = req.body;

//   // Validate input
//   if (message.length < 25) {
//     return res.status(400).send({ error: 'Message must be at least 25 characters long.' });
//   }

//   // Create new post
//   const newPost = new Post({ name, message });

//   try {
//     // Save post to database
//     await newPost.save();

//     // Redirect back to the root URL after posting
//     res.status(201).redirect('/');
//   } catch (error) {
//     console.error('Error saving post:', error);
//     res.status(500).send({ error: 'Something went wrong.' });
//   }
// });

app.listen(port, () => 
  console.log(`Server listening on port ${port}`));



