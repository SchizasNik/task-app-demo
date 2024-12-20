import bcrypt from 'bcrypt';
import { Invitation, InvitationDao, UserRoleEnum, Credentials, UserId } from "@server/types";
import { UsersOperations } from "@server/db/operations/users.operations";
import { CustomError } from "@server/errors/error_handler";
import { InvitationOperations } from "@server/db/operations/invitation.operations";
import { validateToken, createToken } from "@server/utils/auth";
import { saltRounds, expiration } from "@server/config";

export async function createUser ({username,password,invitation_token} : Credentials & Invitation){
    let invitation: InvitationDao | null = null;
    let uuid: string | null = null;
    const users_operations = new UsersOperations;
    const user = await users_operations.getUserByUsername(username);
    if (user) throw new CustomError('username_already_used');
    // validate correct form of invitation_token
    const invitation_operations = new InvitationOperations;
    const decoded_invitation = validateToken<Invitation>(invitation_token);
    if (decoded_invitation) {
        uuid = decoded_invitation.invitation_token;
        invitation = await invitation_operations.getInvitation(uuid);
    }
    // create required data 
    const role: UserRoleEnum = invitation? invitation.role: 'user';
    const hass_pass = bcrypt.hashSync(password, saltRounds);
    // store in Users
    const store_result = await users_operations.storeUser({username,password:hass_pass,role});
    if (store_result.insertedCount !== 1) throw new CustomError('db_error');
    const user_id  = store_result.insertedId.toString();
    const token = createToken<UserId>({user_id}, expiration);
    // delete invitation
    if (invitation) {
        const delete_result = await invitation_operations.removeInvitation(uuid!);
        if (delete_result.deletedCount !== 1) throw new CustomError('db_error')
    };
    return {id:user_id,username,role,token,invitation};
}
