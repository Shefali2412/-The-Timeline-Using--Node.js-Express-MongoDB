const mongoose = require('mongoose')
require('dotenv').config();


mongoose.connect(process.env.dbUrl)
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err))