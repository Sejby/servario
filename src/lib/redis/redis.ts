import Redis from "ioredis";

const redis = new Redis({
  host: "localhost", // nebo název služby v docker-compose, např. "redis"
  port: 6379,        // výchozí port
  // password: "your_password", // pokud byste použili zabezpečení
});

export default redis;
