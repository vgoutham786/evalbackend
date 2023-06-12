const express = require("express");
const connectToDb = require("./config/db");
const userRoute = require("./Routes/user.route");
const weatherRoute = require("./Routes/weather.route");
const limiter = require("./Middleware/ratelimiter");
const app = express();
app.use(express.json());
require("dotenv").config();

port = process.env.Port
console.log(port)
app.use("/", userRoute)
app.use(limiter)
app.use("/weather", weatherRoute)

app.listen(port, async () => {
    try {
        await connectToDb
        //console.log(connectToDb)
        console.log("connected to db");
        console.log("server running")
    } catch (error) {
        console.log(error)
    }

})