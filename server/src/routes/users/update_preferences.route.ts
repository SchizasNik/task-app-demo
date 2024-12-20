import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { view_mapping } from '@server/view_mapping';
import { UsersService } from '@server/services/users.service';

export async function updateUserPreferences(req:Request, res:Response, next:NextFunction){
    const {
        preferred_working_hours,
        working_hours_enabled
    }  = req.body;
    const user_to_crud: UserDao = res.locals.user_to_crud;
    const users_service = new UsersService();
    const updated_user = await users_service.updateUserPreferences({
        preferred_working_hours, 
        working_hours_enabled,
        user_to_crud
    })
    const data = view_mapping.userToPreferences(updated_user);
    return res.status(200).json(data);
}