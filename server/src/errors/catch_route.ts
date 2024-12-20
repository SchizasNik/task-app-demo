import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './error_handler';

export function catchRoute(func: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      errorHandler(error,res)
    }
  };
}
