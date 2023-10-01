import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../domains/sample-domain/errors/bad-request-error';

export const validatorMiddleware = <T extends object>(cls: ClassConstructor<T>) => {
  return async (req: Request<any, any, any>, res: Response<any>, next: NextFunction) => {
    const requestBody = plainToClass(cls, req.body);
    const errors = await validate(requestBody);

    if (errors.length > 0) {
      throw new BadRequestError(`Request body validation failed: ${errors}`);
    }

    next();
  };
};
