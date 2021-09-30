const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: "./logs/example.log",
    }),
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...args } = info;

          return `${timestamp} ${level}: ${message}`;
        })
      ),
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
