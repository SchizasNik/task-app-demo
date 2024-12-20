import { UserRoleEnum, UserDao } from "../types";
import { CustomError } from "../errors/error_handler";
import { tryGet } from "./tryGet";

export function getUserPermittedRoles(user:UserDao){
    const user_role: UserRoleEnum = tryGet(()=>user.role,'user');
    let permitted_roles: UserRoleEnum[];
    switch (user_role) {
        case 'user'     : throw new CustomError('forbidden_users_list');
        case 'manager'  : permitted_roles = ['user']; break;
        case 'admin'    : permitted_roles = ['user','manager','admin']; break;
        default         : throw new Error(`wrong role in db for user: ${JSON.stringify(user)}`);
    }
    return permitted_roles;
}