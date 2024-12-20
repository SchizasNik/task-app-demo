import { CustomError } from '@server/errors/error_handler';
import { UsersOperations } from '@server/db/operations/users.operations';
import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { catchRoute } from '@server/errors/catch_route';

export const canCRUDUser = catchRoute(_canCRUDUser);

async function _canCRUDUser(req: Request, res: Response, next: NextFunction){
    const user: UserDao = res.locals.user;
    const {user_id}     = req.params;
    if (user.id === user_id) {
        res.locals.user_to_crud = user;
        return next();
    }
    if (user.role === 'user') {
        throw new CustomError('forbidden');
    }
    const users_operations = new UsersOperations;
    const user_to_crud = await users_operations.getUserById(user_id);
    if (!user_to_crud) {
        throw new CustomError('missing_user_to_crud');
    }
    if (user.role === 'manager' && user_to_crud.role !== 'user') {
        throw new CustomError('forbidden');
    }
    res.locals.user_to_crud = user_to_crud;
    next();
}