import Redis from "ioredis";

const redisUrl = process.env.REDIS_PUBLIC_URL;

if (!redisUrl) {
  throw new Error("REDIS_PUBLIC_URL is missing in environment");
}

const redis = new Redis(redisUrl);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.log("Redis error", err);
});

export default redis;