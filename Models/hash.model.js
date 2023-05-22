const mongoose = require("mongoose");


let hashSchema = mongoose.Schema({
    id: { type: Number, unique: true, require: true },
    password: { type: String, require: true }
})



let hashModel = mongoose.model("hashedpwds", hashSchema)



module.exports = hashModel