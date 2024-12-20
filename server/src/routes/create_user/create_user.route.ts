import { Request, Response, NextFunction} from 'express';
import { view_mapping } from '@server/view_mapping';
import { createUser } from '@server/services/create_user.service';

export async function createUserRouter (req:Request, res:Response, next:NextFunction){
    const {username,password,invitation_token} = req.body;
    const result            = await createUser({username,password,invitation_token});
    const data    = view_mapping.credentialsToProfileToken(result);
    return res.status(201).json(data);
}
