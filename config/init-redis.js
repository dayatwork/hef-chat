const { createClient } = require("redis");
const logger = require("../logger");

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  logger.info("[Redis on connect]: Client connected to redis...");
});

client.on("ready", () => {
  logger.info(
    "[Redis on ready]: Client connected to redis and ready to use..."
  );
});

client.on("error", (err) => {
  logger.error(`[Redis on error]: ${err.message}`);
});

client.on("end", () => {
  logger.info("[Redis on end]: Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
