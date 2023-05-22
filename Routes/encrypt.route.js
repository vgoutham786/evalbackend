const express = require("express");
const encryptRoute = express.Router();
const { encrypt, decrypt } = require('node-encryption');
const userModel = require("../Models/user.model");
require("dotenv").config()

encryptRoute.post("/encryptmypwd", async (req, res) => {
    let { id, password } = req.body;
    try {
        const text = password;
        const encryptionKey = process.env.encryptKey;

        const encrypted = encrypt(Buffer.from(text), encryptionKey);
        //console.log(encrypted)

        let data = await userModel.insertMany([{ id: id, password: encrypted }])
        res.send({msg:"Password stored successfully in encrypted form"})
    } catch (error) {
        res.status(400).send({ err: error.message })
    }


})
encryptRoute.get("/getmypwd", async (req, res) => {
    let { id } = req.body;
    try {
        let data = await userModel.findOne({ id });
        if (data) {
            password = data.password
            const decrypted = decrypt(password, process.env.encryptKey);
            if (decrypted) {
                res.send({password:decrypted.toString()})
            } else {
                res.send({ msg: "invalid password credentials" })
            }
        } else {
            res.send({ msg: "invalid credentials" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }


})


module.exports = encryptRoute