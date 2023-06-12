const express = require("express");
const userModel = require("../Model/user.model");
const userRoute = express.Router();
const bcrypt = require('bcrypt');
require("dotenv").config();
var jwt = require('jsonwebtoken');
const redisClient = require("../config/redis");



userRoute.post("/register", async (req, res) => {
    let { name, email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            res.send({ msg: "User already registered.Please signin" })
            return
        }
        const hashed = await bcrypt.hash(password, +process.env.salt)
        const obj = { name, email, password: hashed };
        await userModel.insertMany([obj]);
        logger.info(`${name} has registered in`)
        res.send({ msg: "User Registered" })
    } catch (error) {
        logger.error(error.message)
        res.status(400).send({ err: error.message })
    }
})

userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({
                    id: user._id,
                    email: email
                }, process.env.secrect, { expiresIn: '1h' });
                logger.info(`${user.name} has logged in`)
                res.send({ msg: "user login success", token: token })
            } else {
                res.status(400).send({ msg: "invalid credentials" })
            }
        } else {
            res.status(400).send({ msg: "User not found.Please Register" })
        }
    } catch (error) {
        logger.error(error.message)
        res.status(400).send({ err: error.message })
    }
});

userRoute.post("/logout", async (req, res) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    await redisClient.hSet("blacktokens", token, "false")
    logger.info(`${token} has logged in`)
    res.send({ msg: "logged out success" })
})

module.exports = userRoute