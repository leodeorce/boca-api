import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";
import jwt from "jsonwebtoken";
import * as fs from "fs";

import { ILogger } from "./logging/ILogger";

import { ApiError } from "./errors/ApiError";

import { HttpStatus } from "./shared/definitions/HttpStatusCodes";
import { AuthPayload } from "./shared/definitions/AuthPayload";

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
    res
      .status(err.status)
      .json({ error: err.name, message: err.message })
      .end();
    return;
  } else if (err instanceof QueryFailedError) {
    res
      .status(HttpStatus.INTERNAL_ERROR)
      .json({ error: err.name, message: "Database query error" })
      .end();
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
  res
    .status(HttpStatus.INTERNAL_ERROR)
    .json({ error: "Unexpected error" })
    .end();
  next();
}

function fallbackRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(HttpStatus.NOT_FOUND).end();
  next();
}

function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const logger: ILogger = container.resolve("ApiLogger");
  logger.logRequest(req.method, req.originalUrl, req.ip);
  next();
}

const authenticate = (authorizedUserTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token === undefined || token == null) {
      throw ApiError.unauthorized("Missing authorization token");
    }

    const publicKey = fs.readFileSync("./secrets/public.key", "utf8");
    if (publicKey === undefined) {
      throw ApiError.internal(
        "Cannot verify authentication token: Public key not found"
      );
    }

    let decodedToken: AuthPayload;
    try {
      decodedToken = jwt.verify(token, publicKey, {
        issuer: "BOCA API",
        audience: "boca-api",
        algorithms: ["RS256"],
      }) as AuthPayload;
    } catch (error) {
      throw ApiError.unauthorized("Authorization token invalid: " + error);
    }

    if (authorizedUserTypes.includes(decodedToken.usertype) === false) {
      throw ApiError.forbidden(
        "Authenticated user is unauthorized to use this endpoint"
      );
    }

    req.body.userinfo = decodedToken;

    next();
  };
};

export {
  errorLogger,
  errorHandler,
  fallbackRouteHandler,
  fallbackErrorHandler,
  requestLogger,
  authenticate,
};
