import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';

export const requestHandlerMiddleware = <T>(
  handler: (req: Request<any, any, any>) => Promise<T>,
) => {
  return async (req: Request<any, any, any>, res: Response<T>) => {
    const response = await handler(req);

    return res.status(HttpStatusCode.Ok).json(response);
  };
};
