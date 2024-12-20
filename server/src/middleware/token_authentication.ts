import { validateToken } from '@server/utils/auth';
import { tryGet } from '@server/utils/tryGet';
import { CustomError } from '@server/errors/error_handler';
import { Request, Response, NextFunction } from 'express';
import { UserId } from '@server/types';
import { catchRoute } from '@server/errors/catch_route';

export const tokenAuthentication = catchRoute(_tokenAuthentication);

function _tokenAuthentication(req: Request, res: Response, next: NextFunction) {
  const token: string | null = tryGet(
    () => req.headers.authorization || req.query.token,
    null
  );
  if (!token) throw new CustomError('invalid_token');
  const decoded = validateToken<UserId>(token);
  if (!decoded) throw new CustomError('invalid_token');
  res.locals.user_id = decoded.user_id;
  next();
}
