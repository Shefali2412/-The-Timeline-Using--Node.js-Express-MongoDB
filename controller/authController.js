const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



const registerLoginPage = (req, res) => {
        console.log(req.cookies)
         res.render('login', {
          error: " ",
          success: " "
         })

}
 
const register = (req, res) => {
      if (req.body.password === ""){
        res.render('login', {
          error: "Password cannot be empty",
          success: ""
        })
      } 
      else {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10) // save encrypted pass in db
        let userObj = {
          ...req.body,   // all info inside req.body
          password : hashedPassword
        }
        // just to check 
        // console.log(req.body); 
        // console.log(newObj);
        
        let newUser = new User(userObj) 
        // console.log(newUser);
        newUser.save()
        .then(() => {
          res.render('login', {
            error: " ",
            success: "You are registered & now you can Login"
           })
        })
        .catch(err => {
          console.log(err)
        })
        

      }
  }

const login = async (req, res) => { 
  // console.log(req)
  let user = await User.findOne({email: req.body.email})

  if(!user) {
        res.render('login', {
          error: " User does not exist , Register first",
          success: " "
         })
      }  else {
        let isCorrectPass = await bcrypt.compareSync(req.body.password ,user.password) // compare password with db & req

        // console.log(isCorrectPass)
        if(!isCorrectPass) {
              res.render('login' , {
                error: " Wrong password",
                  success: " "
              })
            } else { 
              // auth
              let userInfoForToken = {
                id: user._id,
                username: user.username,
                email: user.email

              }
              console.log(userInfoForToken) 
              // creating token
              let userToken = jwt.sign({ userInfoForToken }, "this is a random text for jwt ") // in token we pass object(this is data which will be converted to token using secret key) & secret key
              // console.log(userToken)
            
              res.cookie('isLoggedIn', true)
              // save token inside cookie
              res.cookie('jwt', userToken) // we pass name & value of cookie
              res.redirect('/post')
              //console.log(req.cookies)
            }
      }
    }

  


const postpage = (req, res) => { 
  res.render('post')
}

const logOut = (req, res) => { 
  res.cookie('isLoggedIn', false)  // either we can ue true or false cookie or another way - we can clear cookie 
  res.clearCookie('test')
  res.clearCookie('jwt')
  res.redirect('/')
}

const aboutpage = (req, res) => {
  res.render('about')
}
  
  

//     
//   } else { 
//     res.cookie('isLoggedIn', true)
//     res.redirect('/posts')
//     console.log(req.cookies)
     
    
//   }
 
//     // res.render('index')
// }
// }
//   try {
  
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

module.exports = { 
  registerLoginPage ,
  register,
  login,
  postpage,
  logOut,
  aboutpage
};