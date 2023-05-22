require("dotenv").config();
var jwt = require('jsonwebtoken');
const blacklistModel = require("../Models/blacklist.model");

let auth = async (req, res, next) => {
    try {
        let access_token = req?.headers?.authorization?.split(" ")[1];
        let data = await blacklistModel.findOne({ token: access_token })
        //console.log(data)
        if (data) {
            res.send("you have logged out please login again/ you have been blacklisted")
            return
        }
        var decoded = jwt.verify(access_token, process.env.tokenKey);

        if (decoded) {
           // console.log(decoded)
            req.body.userId = decoded.id
            req.body.role = decoded.role
            next()
        } else {
            res.send({ msg: "please login" })
        }

    } catch (error) {
        res.send({ err: error.message })
    }


}

module.exports = auth