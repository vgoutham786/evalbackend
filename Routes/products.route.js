const express = require("express");
const auth = require("../Middleware/auth.middleware");
const productsModel = require("../Models/products.model");
const productRoute = express.Router()

productRoute.use(auth)
productRoute.get("/products", async (req, res) => {
    const { userId, role } = req.body;
    try {

        let data = await productsModel.find()
        res.send({ products: data })

    } catch (error) {
        res.send({ err: error.message })
    }

})
productRoute.post("/addproducts", async (req, res) => {
    const { userId, role, name, price } = req.body;
    try {
        if (role == "seller") {
            let data = await productsModel.insertMany([{ name, price, userId }])
            res.send({ msg: "product added successfully" })
        } else {
            res.send("You are not authorized to perform")
        }
    } catch (error) {
        res.send({ err: error.message })
    }

})
productRoute.delete("/deleteproducts", async (req, res) => {
    const { userId, role, name } = req.body;
    try {
        if (role == "seller") {

            let data = await productsModel.findOne({ name })
            if (data) {
                let del = await productsModel.findByIdAndDelete(data._id)
            } else {
                res.send("product doesent exist")
            }

            res.send({ msg: "product deleted successfully" })
        } else {
            res.send("You are not authorized to perform")
        }
    } catch (error) {
        res.send({ err: error.message })
    }

})

module.exports = productRoute