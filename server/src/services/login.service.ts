import bcrypt from 'bcrypt';
import { Credentials, UserId } from "@server/types";
import { UsersOperations } from "@server/db/operations/users.operations";
import { CustomError } from "@server/errors/error_handler";
import { expiration } from "@server/config";
import { createToken } from "@server/utils/auth";

export async function loginUser({username, password }:Credentials){
    const users_operations = new UsersOperations;
    const user      = await users_operations.getUserByUsername(username);
    if (!user) throw new CustomError('missing_user');
    const user_id       = user.id;
    const pass_db   = user.password;
    const valid     = bcrypt.compareSync(password, pass_db);
    if (!valid) {
        throw new CustomError('invalid_password');
    } 
    const token     = createToken<UserId>({user_id},expiration);
    return {token,user};
}