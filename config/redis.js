const redis = require("redis");
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379
})

redisClient.connect();
redisClient.on("connect", () => {
    console.log("connected to redis")
})


module.exports=redisClient