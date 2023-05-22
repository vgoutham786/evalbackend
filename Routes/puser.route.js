const express = require("express");
const puserRoute = express.Router();
const bcrypt = require('bcrypt');
const puserModel = require("../Models/puser.model");
require("dotenv").config()
var jwt = require('jsonwebtoken');
const blacklistModel = require("../Models/blacklist.model");
puserRoute.post("/signup", async (req, res) => {

    let { name, password, email, role } = req.body;
    try {

        const hasedPassword = await bcrypt.hash(password, +(process.env.saltRounds))

        let data = await puserModel.insertMany([{ name: name, password: hasedPassword, email: email, role: role }])
        res.send({ msg: "User register successfully." })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }


})
puserRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let data = await puserModel.findOne({ email });
        if (data) {
            let hashpassword = data.password
            let result = bcrypt.compareSync(password, hashpassword);
            if (result) {
                var token = jwt.sign({ id: data._id, role: data.role }, process.env.tokenKey, { expiresIn: "1m" });
                var refreshToken = jwt.sign({ id: data._id, role: data.role }, process.env.tokenKey, { expiresIn: "5m" });

                res.send({ msg: "login successful", token: token, refreshToken: refreshToken })
            } else {
                res.send({ msg: "invalid credentials" })
            }


        } else {
            res.send({ msg: "invalid credentials" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }


})
puserRoute.post("/refresh", async (req, res) => {

    try {
       // console.log(req.headers)
        let access_token = req?.headers?.authorization?.split(" ")[1];
      //  console.log(access_token)
        var decoded = jwt.verify(access_token, process.env.tokenKey);
        if (decoded) {
            var token = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.tokenKey, { expiresIn: "1m" });
            res.send({ token: token })
        } else {
            res.send({ msg: "please login" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})
puserRoute.post("/logout", async (req, res) => {
    try {
        let access_token = req?.headers?.authorization?.split(" ")[1];
        await blacklistModel.insertMany([{ token: access_token }])
        res.send({ msg: "logout successful" })
    } catch (error) {
        res.send({ err: error.message })
    }
})

module.exports = puserRoute