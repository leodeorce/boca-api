import { NextFunction, Request, Response } from "express";
import { ILogger } from "logging/ILogger";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";
import { ApiError } from "./errors/ApiError";

function errorLogger(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const logger: ILogger = container.resolve("ApiLogger");

  if (err instanceof ApiError) {
    logger.logWarning(`${err.name}: ${err.message}`);
  } else {
    logger.logError(err);
  }

  next(err);
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message }).end();
    return;
  } else if (err instanceof QueryFailedError) {
    res.status(500).json({ error: "Database query error" }).end();
    return;
  }

  next(err);
}

function fallbackErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).json({ error: "Unexpected error" }).end();
  next();
}

function fallbackRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).end();
  next();
}

function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const logger: ILogger = container.resolve("ApiLogger");
  logger.logRequest(req.method, req.originalUrl);
  next();
}

export {
  errorLogger,
  errorHandler,
  fallbackRouteHandler,
  fallbackErrorHandler,
  requestLogger,
};
