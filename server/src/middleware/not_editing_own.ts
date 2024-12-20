import { CustomError } from '@server/errors/error_handler';
import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { catchRoute } from '@server/errors/catch_route';

export const notEditingOwn = catchRoute(_notEditingOwn);

async function _notEditingOwn(req: Request, res: Response, next: NextFunction){
    const user: UserDao = res.locals.user;
    const {user_id}     = req.params;
    if ( user_id === user.id ) throw new CustomError('forbidden_own_edits');
    next();
}
