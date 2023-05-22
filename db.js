const mongoose = require("mongoose");
require("dotenv").config()

let connectToDB = mongoose.connect(process.env.mongoURL)



module.exports = connectToDB