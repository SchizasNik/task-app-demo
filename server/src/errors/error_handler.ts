import { Response } from "express";

export const error_mapping = {
    // internal & Db
    internal_error: { status:500, error:'Server Error', message: 'Internal server error'},
    db_error: { status:500, error:'Database Error', message: 'Database error'},
    // authentication
    invalid_token: { status:401, error:'Unauthorized ', message:'Τοken is Invalid or Expired'},
    missing_user: { status:401, error:'Unauthorized ', message:'User not found'},
    invalid_password: { status:401, error:'Unauthorized ', message:'Ιncorrect password'},
    // forbidden
    username_already_used: {status:403, error:'Forbidden', message:'Username already used'},
    forbidden_users_list: { status: 403, error:'Forbidden', message:'User has no list permission'},
    forbidden: { status: 403, error:'Forbidden', message:'User has no permission for this action'},
    forbidden_own_edits: { status: 403, error:'Forbidden', message:'User has no permission to edit his own records'},
    // tasks
    missing_task:{ status: 404, error:'Not Found', message:'The Task you are trying to edit/delete cannot be found'},
    missing_owner: { status:404, error:'Not Found', message:'Owner of tasks deleted'},
    missing_user_to_crud:{ status:404, error:'Not Found', message:'User to access not found'},
}

export type Errors = keyof typeof error_mapping;

export class CustomError extends Error {
    name: Errors;
    date: Date;
	constructor(name: Errors){
        super();
        this.name = name;
        this.date = new Date();
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
          }
      
	}
}

export function errorHandler(err: Error|CustomError, res:Response){
    if (err instanceof CustomError){
        const name          = err.name;
        const custom_error  = error_mapping[name];
        const error_obj     = {
            statusCode: custom_error.status,
            error: custom_error.error,
            message: custom_error.message
        }
        console.error(error_obj);
        return res.status(custom_error.status).json(error_obj);
    }
    else{
        console.error(err);
        const custom_error = error_mapping.internal_error;
        const error_obj = {
            statusCode: custom_error.status,
            error: custom_error.error,
            message: custom_error.message
        }
        return res.status(custom_error.status).json(error_obj);
    }
}
