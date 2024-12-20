import { CustomError } from '@server/errors/error_handler';
import { UsersOperations } from '@server/db/operations/users.operations';
import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { catchRoute } from '@server/errors/catch_route';

export const canCRUDTasks = catchRoute(_canCRUDTasks);

async function _canCRUDTasks(req: Request, res: Response, next: NextFunction){
    const user: UserDao = res.locals.user;
    const user_id:string   = req.params.user_id || res.locals.owner_id;
    if (user.id === user_id ) {
        res.locals.owner = user;
        return next();
    }
    if (user.role !== 'admin') throw new CustomError('forbidden');
    const users_operations = new UsersOperations;
    const owner = await users_operations.getUserById(user_id);
    if (!owner) throw new CustomError('missing_owner');

    res.locals.owner = owner;
    next();
}
