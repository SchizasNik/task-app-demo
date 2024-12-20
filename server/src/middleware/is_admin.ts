import { CustomError } from '@server/errors/error_handler';
import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { catchRoute } from '@server/errors/catch_route';

export const isAdmin = catchRoute(_isAdmin)

async function _isAdmin(req: Request, res: Response, next: NextFunction){
    const user: UserDao  = res.locals.user;
    const role  = user.role;
    if (role !== 'admin') throw new CustomError('forbidden');
    next();
}
