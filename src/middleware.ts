import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { ApiError } from "./errors/ApiError";

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

export { errorHandler, fallbackRouteHandler, fallbackErrorHandler };
