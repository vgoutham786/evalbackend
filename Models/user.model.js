const mongoose = require("mongoose");


let userSchema = mongoose.Schema({
    id: { type: Number, unique: true, require: true },
    password: { type: String, require: true }
})



let userModel = mongoose.model("encryptedpwds", userSchema)



module.exports = userModel