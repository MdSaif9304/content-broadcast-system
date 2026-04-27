import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_PUBLIC_URL as string);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.log("Redis error", err);
});

export default redis;