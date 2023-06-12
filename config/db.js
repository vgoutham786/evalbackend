const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = mongoose.connect(process.env.MongoUrl);

//console.log(  connectToDb)
module.exports=connectToDb
