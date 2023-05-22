const mongoose = require("mongoose");


let productsSchema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    userId: { type: String }
})

let productsModel = mongoose.model("product", productsSchema)

module.exports = productsModel