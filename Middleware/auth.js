
const regex = require("regex")
const redisClient = require("../config/redis");
require("dotenv").config()

const auth = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    const city = req.body.city
    const check = await redisClient.hGet("tokens", token);
    if (check) {
        res.status("400").send("user has looged out please login again")
        return
    }
    const decoded = jwt.verify(token, process.env.secrect);
    if (decoded) {
        req.userId = decoded.userId;
        const check = new regex(/^[A-Za-z]$/)
        if (check.test(city)) {
            next()
        } else {
            res.send({ msg: "enter valid city" })
        }

    } else {
        res.send("Invalid token")
    }

}

module.exports = auth


