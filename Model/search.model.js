const mongoose = require("mongoose");


const searchSchema = mongoose.Schema({
    city: [],
    userId: String
})

const searchModel = mongoose.model("search", searchSchema);

module.exports = searchModel