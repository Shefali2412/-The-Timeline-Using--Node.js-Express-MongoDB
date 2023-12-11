const jwt = require('jsonwebtoken');


const isAuth = (req, res, next) => {
    if(req.body.email === "") {
        res.render('login', {
            error: "email cannot be empty",
            success: ""
          })
    } else {
        next()
    }
}

// if we have cookie user is loggedin & if not have cookie user is not logged in

const isLoggedInUser = (req, res, next) => {
    if(req.cookies.isLoggedIn === "true") {
        jwt.verify(req.cookies.jwt, "this is a random text for jwt ", (err, data) => { // using this to vrify token by passing user or client jwt , secret string & function
           if(err) {
              console.log(err)
           } else {
            console.log(data.userInfoForToken)
           
           // save the user 
            res.locals.username = data.userInfoForToken.username;   // it will only save username
            res.locals.email = data.userInfoForToken.email;
            res.locals.userId = data.userInfoForToken.id;

        next();
           }
        })  
    } else{
        res.redirect('/')
    }
}


// if logged in cannot go to homepage  only go to postpage
const checkUserLogIn = (req, res, next) => {
    if(req.cookies.isLoggedIn === "true") {
        res.redirect('/post')
    } else{
        next()
    }
 
}
// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'Hello this is me');
//     req.userData = { userId: decodedToken.userId };
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Authentication failed' });
//   }
// };

module.exports = {
    isAuth,
    isLoggedInUser,
    checkUserLogIn
}