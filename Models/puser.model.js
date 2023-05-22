const mongoose = require("mongoose");


let puserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String, require: true },
    role: { type: String, enum:["buyer", "seller"],default:"buyer" }

})



let puserModel = mongoose.model("productUser", puserSchema)



module.exports = puserModel