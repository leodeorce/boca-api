import { createLogger, format, Logger, transports } from "winston";
import { ILogger } from "../ILogger";

class ApiLogger implements ILogger {
  private logger: Logger;

  constructor() {
    const customFormat = format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    });

    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.splat(),
        customFormat
      ),
      transports: [
        new transports.Console(),
      ],
    });
  }

  async logRequest(method: string, url: string): Promise<void> {
    this.logger.log("info", "%s %s", method, url);
  }

  async logError(err: Error): Promise<void> {
    this.logger.log("error", "%s: %s", err.name, err.message);
  }

  async logWarning(message: string): Promise<void> {
    this.logger.log("warn", message);
  }
}

export { ApiLogger };
