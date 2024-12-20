import { UserDao, UserRole, UserPrefs } from '@server/types';
import { getUserPermittedRoles } from '@server/utils/getPermittedRoles';
import { UsersOperations } from '@server/db/operations/users.operations';
import { CustomError } from '@server/errors/error_handler';

export class UsersService {
    async getUsersList(user: UserDao){
        let permitted_roles = getUserPermittedRoles(user);
        const user_operations = new UsersOperations;
        const list = await user_operations.getUsers(permitted_roles, user.id);
        return list;
    }

    async updateUserPreferences({
        preferred_working_hours,
        working_hours_enabled, 
        user_to_crud
    } : UserPrefs & {user_to_crud:UserDao}){
        const user_to_crud_id = user_to_crud.id;
        if ( user_to_crud.preferred_working_hours === preferred_working_hours
            && user_to_crud.working_hours_enabled === working_hours_enabled){
                return user_to_crud;
            }
        user_to_crud.preferred_working_hours = preferred_working_hours;
        user_to_crud.working_hours_enabled = working_hours_enabled;

        const {id, ...user_without_id}:any= user_to_crud;
        const user_operations = new UsersOperations;
        const update_result = await user_operations.replaceUser(user_without_id, user_to_crud_id);
        if (update_result.modifiedCount !== 1) throw new CustomError('db_error');
        return user_to_crud;
    }
    
    async updateUserRole({
        role, user_to_crud_id
        } : UserRole & {user_to_crud_id:string}){
        const user_operations = new UsersOperations;
        const user_to_crud = await user_operations.getUserById(user_to_crud_id);
        if (!user_to_crud) throw new CustomError('missing_user_to_crud');
        if (user_to_crud.role === role) return user_to_crud;
        user_to_crud.role = role;
        const {id, ...user_without_id}:any= user_to_crud;
        const update_result = await user_operations.replaceUser(user_without_id, user_to_crud_id);
        if (update_result.modifiedCount !== 1) throw new CustomError('db_error');
        return user_to_crud;
    }

    async deleteUser(user_to_crud_id:string){
        const user_operations   = new UsersOperations;
        const delete_result     = await user_operations.deleteUserById(user_to_crud_id);
        if (delete_result.deletedCount !== 1) throw new CustomError('db_error');
        return;
    }
}