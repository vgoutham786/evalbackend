const express = require("express");
const connectToDB = require("./db");
const encryptRoute = require("./Routes/encrypt.route");
const hashedRoute = require("./Routes/hashed.route");
const puserRoute = require("./Routes/puser.route");
const productRoute = require("./Routes/products.route");
const app = express();
app.use(express.json());


app.use("/enc", encryptRoute)
app.use("/hash", hashedRoute)
app.use("/user", puserRoute)
app.use("/", productRoute)


app.listen(8080, async () => {
    try {
        await connectToDB
        console.log("connected to db")
        console.log("server running")
    } catch (error) {
        console.log(error)
    }
})