import { Request, Response, NextFunction} from 'express';
import { view_mapping } from '@server/view_mapping';
import { loginUser } from '@server/services/login.service';

export async function loginUserRoute (req:Request, res:Response, next:NextFunction){
    const {username, password } =  req.body;
    const {token, user} = await loginUser({username,password});
    const data = view_mapping.userToProfileToken({token,user});
    return res.status(201).json(data);
}