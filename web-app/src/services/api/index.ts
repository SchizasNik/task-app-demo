import { 
    createPost, 
    createGet, 
    createPut,
    createDelete,
    apiEvents,
    createGetDownload
} from './apiCalls'
import { tryGet } from 'utils/tryGet';
import { Credentials, User, Profile, Token, UserRole, Task, Invitation, UserPrefs, DateRange, NewTask } from 'types';
import { accessStore, AppStore } from 'services/store';
import { setToken } from 'services/auth';

apiEvents.on('api-error', error => {
    if ( tryGet( () => error.response.status ) == 401 ) {
        logOut();
    }
})

const logOut = async () => {
    setToken('')
    AppStore.user.set(undefined)
}

export const api = {
    logOut,
    // auth
    login: createPost<Credentials, Profile & Token>('/api/auth'),
    // account
    createUser: createPost<Credentials & { invitation_token?: string}, Profile & Token & { invite_error?: string }>('/api/users/account'),
    // all below require authentication header
    // users
    users: createGet<void, Profile[]>('/api/users/list'),
    profile: createGet<void, Profile>('/api/users/profile'),
    updateUserRole: (id: string) => createPut<UserRole, UserRole>(`/api/users/${ id }/role`),
    updateUserPrefs: (id: string) => createPut<UserPrefs, UserPrefs>(`/api/users/${ id }/preferences`),
    deleteUser: (id: string) => createDelete<void, void>(`/api/users/${ id }`)(),
    // tasks
    tasks: (id: string) => createGet<DateRange, Task[]>(`/api/users/${ id }/tasks/list`),
    downloadTasks: (id: string) => createGetDownload<DateRange & { token: string }>(`/api/users/${ id }/tasks/list/download`),
    createTask: (id: string) => createPost<NewTask, Task>(`/api/users/${ id }/tasks`),
    updateTask: (id: string) => createPut<NewTask, Task>(`/api/tasks/${ id }`),
    deleteTask: (id: string) => createDelete<void, void>(`/api/tasks/${ id }`)(),
    // invitations
    createInvitation: createPost<UserRole, Invitation>(`/api/invitations`)
} 