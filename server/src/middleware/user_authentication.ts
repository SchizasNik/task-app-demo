import { CustomError } from '@server/errors/error_handler';
import { UsersOperations } from '@server/db/operations/users.operations';
import { Request, Response, NextFunction } from 'express';
import { catchRoute } from '@server/errors/catch_route';

export const userAuthentication = catchRoute(_userAuthentication);

async function _userAuthentication(req: Request, res: Response, next: NextFunction){
    const _id: string = res.locals.user_id;
    const user_operations = new UsersOperations;
    const user  = await user_operations.getUserById(_id);
    if (!user) throw new CustomError('missing_user');
    res.locals.user = user;
    next();
}
