## middlewares

tokenMiddleware: checks if token is valid

userMiddleware: fetches user from user_id in token

isManagementMiddleware: checks if manager / admin

isAdminMiddleware: checks if admin

notEditingOwnMiddleware: checks the usual

canCRUDUserMiddleware: checks if user can crud user with id in url
also fetches editing user in

canCRUDRecordsMiddleware: checks if user can crud records of user with id in url
also fetches editing user in

getTaskOwnerMiddleware:  fetches task's owner id. places id in locals so that
canCRUDRecordsMiddleware can utilize it

## routes

---
/api/auth
---
/api/users/account
---
tokenMiddleware
userMiddleware
isManagementMiddleware
/api/users/list
---
tokenMiddleware
userMiddleware
/api/users/profile
---
tokenMiddleware
userMiddleware
isAdminMiddleware
notEditingOwnMiddleware
/api/users/${ id }/role
---
tokenMiddleware
userMiddleware
canCRUDUserMiddleware
/api/users/${ id }/preferences
---
tokenMiddleware
userMiddleware
canCRUDUserMiddleware
notEditingOwnMiddleware
delete - /api/users/${ id }
---
tokenMiddleware
userMiddleware
canCRUDRecordsMiddleware
/api/users/${ id }/tasks/list
---
tokenMiddleware
userMiddleware
canCRUDRecordsMiddleware
/api/users/${ id }/tasks
---
tokenMiddleware
userMiddleware
getTaskOwnerMiddleware
canCRUDRecordsMiddleware
PUT - /api/tasks/${ id }
---
tokenMiddleware
userMiddleware
getTaskOwnerMiddleware
canCRUDRecordsMiddleware
DELETE - /api/tasks/${ id }
---
tokenMiddleware
userMiddleware
isManagementMiddleware
/api/invitations