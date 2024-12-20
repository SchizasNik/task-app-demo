import { Request, Response, NextFunction } from 'express';
import { UserDao } from '@server/types';
import { view_mapping } from '@server/view_mapping';

export async function getProfile(req:Request, res:Response, next:NextFunction){
    const user: UserDao = res.locals.user;
    const data = view_mapping.userToProfile(user);
    return res.status(200).json(data);
}