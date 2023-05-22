const express = require("express");
const hashedRoute = express.Router();
const bcrypt = require('bcrypt');
const hashModel = require("../Models/hash.model");
require("dotenv").config()

hashedRoute.post("/hashmypwd", async (req, res) => {

    let { id, password } = req.body;
    try {

        const hasedPassword = await bcrypt.hash(password, +(process.env.saltRounds))

        let data = await hashModel.insertMany([{ id: id, password: hasedPassword }])
        res.send({ msg: "Hash of the Password stored successfully." })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }


})
hashedRoute.get("/verifymypwd", async (req, res) => {
    let { id, password } = req.body;
    try {
        let data = await hashModel.findOne({ id });
        if (data) {
            let hashpassword = data.password
            let result = bcrypt.compareSync(password, hashpassword);
            res.send(result)

        } else {
            res.send({ msg: "invalid credentials" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }


})


module.exports = hashedRoute