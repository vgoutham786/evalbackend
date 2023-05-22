const mongoose = require("mongoose");


let blacklistSchema = mongoose.Schema({
    token: { type: String }
})

let blacklistModel = mongoose.model("blacklist", blacklistSchema)

module.exports = blacklistModel