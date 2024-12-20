import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { view_mapping } from '@server/view_mapping';
import { UsersService } from '@server/services/users.service';

export async function getUsersList(req:Request, res:Response, next:NextFunction){
    const user: UserDao   = res.locals.user;
    const users_service = new UsersService();
    const users_list    = await users_service.getUsersList(user);  
    const data = view_mapping.userListToProfileList(users_list);
    return res.status(200).json(data);
}