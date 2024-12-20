import { UserRole, UserDao, Profile, Token, UserRoleEnum, UserPrefs, InvitationDao, TaskDao } from "@server/types"

export const view_mapping = {
    // Users
    userToProfileToken: ({token,user}: Token & {user:UserDao})=>{
        const data: Profile & Token  = {
            token,
            user:{
                id:user.id,
                username:user.username,
            },
            preferences:{
                preferred_working_hours: user.preferred_working_hours,
                working_hours_enabled: user.working_hours_enabled
            },
            role:{
                role:user.role
            }
        }
        return data;
    },

    credentialsToProfileToken: ({id, username,role,token, invitation}:{id:string, username: string, role: UserRoleEnum, token: string, invitation:InvitationDao|null})=>{
        const data: Profile & Token & {invite_error?: string} = {
            token,
            user: {
              id,
              username,
            },
            preferences:{
                preferred_working_hours: 8,
                working_hours_enabled: false
            },
            role:{
                role
            },
          }
          if (!invitation) data.invite_error  = 'The invitation has been expired. You created a user account.';

        return data;
    },

    userListToProfileList: (users:UserDao[])=>{
        const data: Profile[] = users.map(x=>{
            return {
                user:{
                    id:x.id,
                    username:x.username,
                },
                preferences:{
                    preferred_working_hours:x.preferred_working_hours,
                    working_hours_enabled:x.working_hours_enabled
                },
                role:{
                    role:x.role
                }
            }
        })

        return data;
    },

    userToPreferences:(user:UserDao)=>{
        const data : UserPrefs = {
            preferred_working_hours:user.preferred_working_hours,
            working_hours_enabled:user.working_hours_enabled
        }
        return data;
    },

    userToRole:(user:UserDao)=>{
        const data : UserRole = {
            role:user.role,
        }
        return data;
    },

    userToProfile: (user:UserDao)=>{
        const data : Profile = {
                user:{
                    id: user.id,
                    username: user.username,
                },
                preferences:{
                    preferred_working_hours: user.preferred_working_hours,
                    working_hours_enabled: user.working_hours_enabled
                },
                role:{
                    role: user.role
                }
            }

        return data;
    },
    
    // Tasks
    taskListToTaskDtoList: (tasks: TaskDao[]) => {
        tasks.forEach((task) => Reflect.deleteProperty(task, 'user_id'));
        return tasks;
    }, 

    taskToTaskDto: (task: TaskDao) => {
        const data = task;
        Reflect.deleteProperty(data, 'user_id');
        return data;
    },

    // Invitations
    uuidToInvitation: (uuid:string)=>{
        const data = {
            invitation_token: uuid
        }
        return data
    }
}

export type Success = keyof typeof view_mapping;