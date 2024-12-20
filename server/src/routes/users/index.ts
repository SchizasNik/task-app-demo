import { Router } from 'express';
// Errors wrapper
import { catchRoute } from '@server/errors/catch_route';
// Middleware
import { isAdmin } from '@server/middleware/is_admin';
import { isManagment } from '@server/middleware/is_managment';
import { canCRUDUser } from '@server/middleware/can_crud_users';
import { notEditingOwn } from '@server/middleware/not_editing_own';
// Validations
import { validatePrefs } from '@server/validations/users/update_preferences';
import { validateRole } from '@server/validations/users/update_role';
import { validateDelete } from '@server/validations/users/delete_user';
// Routers
import { getProfile } from '@server/routes/users/profile.route';
import { getUsersList } from '@server/routes/users/list.route';
import { updateUserPreferences } from '@server/routes/users/update_preferences.route';
import { updateUserRole } from '@server/routes/users/update_role.route';
import { deleteUser } from '@server/routes/users/delete.route';


export const router = Router();

router.get(
    '/profile', 
    catchRoute(getProfile)
);
router.get(
    '/list', 
    isManagment,
    catchRoute(getUsersList) 
);
router.put(
    '/:user_id/preferences',
    validatePrefs, 
    canCRUDUser, 
    catchRoute(updateUserPreferences)
);
router.put(
    '/:user_id/role',
    validateRole, 
    isAdmin, 
    notEditingOwn, 
    catchRoute(updateUserRole)
);
router.delete(
    '/:user_id', 
    validateDelete,
    canCRUDUser, 
    notEditingOwn, 
    catchRoute(deleteUser)
);
