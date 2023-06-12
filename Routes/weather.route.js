const express = require("express");
require("dotenv").config()
const fetch = require('node-fetch');
const searchModel = require("../Model/search.model");
const auth = require("../Middleware/auth");
const redisClient = require("../config/redis");
const weatherRoute = express.Router();


weatherRoute.use(auth)
weatherRoute.post("/", async (req, res) => {
    const city = req.body.city
    const userId = req.body.userId

    try {
        const dat = await redisClient.hGet("weather", city)
        if (dat) {
            res.send(dat)
        }
        const re = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.key}&q=${city}&aqi=no`);
        const data = res.json();
        await redisClient.hSet("weather", city, data, {
            EX: 60 * 30
        })
        const cdata = await searchModel.findOne({ userId: userId })
        cdata.city.push(city);
        await searchModel.update({ _id: cdata._id, cdata })
        logger.info(`${city} city has searched`)
        res.send(data)
    } catch (error) {
        logger.error(error.message)
        res.status(400).send({ err: error.message })
    }
})

module.exports = weatherRoute