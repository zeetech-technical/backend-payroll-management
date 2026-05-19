/* istanbul ignore file */
import { createLogger, format, transports } from "winston";

const consoleTransport = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
});

const logger = createLogger({
  level: "info",
  defaultMeta: { service: "api-node-ts" },
  transports: [
    consoleTransport,
  ],
});

export default logger;