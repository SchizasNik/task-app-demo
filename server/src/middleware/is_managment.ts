import { CustomError } from '@server/errors/error_handler';
import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { catchRoute } from '@server/errors/catch_route';

export const isManagment = catchRoute(_isManagment);

async function _isManagment(req: Request, res: Response, next: NextFunction) {
  const user: UserDao = res.locals.user;
  const role = user.role;
  if (!['manager', 'admin'].includes(role)) throw new CustomError('forbidden');
  next();
}
