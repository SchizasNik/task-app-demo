import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@server/types';
import { view_mapping } from '@server/view_mapping';
import { UsersService } from '@server/services/users.service';

export async function updateUserRole(req:Request, res:Response, next:NextFunction){
    const { role } : UserRole     = req.body;
    const user_to_crud_id: string = req.params.user_id;
    const users_service = new UsersService();
    const updated_user = await users_service.updateUserRole({role,user_to_crud_id});
    const data = view_mapping.userToRole(updated_user);
    return res.status(200).json(data);
}