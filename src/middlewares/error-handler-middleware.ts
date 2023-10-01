import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { Logger } from '../util/logger';
import { BadRequestError } from '../domains/sample-domain/errors/bad-request-error';
import { NotFoundError } from '../domains/sample-domain/errors/not-found-error';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    return res.status(HttpStatusCode.BadRequest).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(HttpStatusCode.NotFound).json({
      message: err.message,
    });
  }

  Logger.error('An unknown error thrown:', err);
  return next(err);
};
