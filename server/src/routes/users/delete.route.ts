import { Request, Response, NextFunction } from 'express';
import { UsersService } from '@server/services/users.service';

export async function deleteUser (req:Request, res:Response, next:NextFunction){
    const user_to_crud_id   = req.params.user_id;
    const users_service     = new UsersService();   
    await users_service.deleteUser(user_to_crud_id);
    return res.status(204).end();
}