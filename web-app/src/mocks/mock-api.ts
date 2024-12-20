import { api } from 'services/api'
import { Dictionary, UserRoleEnum } from 'types'

const use_mocks: Dictionary<boolean> = {
    'login': true,
    'profile': true,
    'tasks': true,
    'deleteTask': true,
    'updateTask': true,
    'users': true,
    'deleteUser': true,
    'updateUserPrefs': true,
    'updateUserRole': true,
}

const randStr = (l: number) => Math.random().toFixed(l).substr(2);
const randNum = (num: number = 4) => Math.round(num * Math.random());
const wait = (s: number) => new Promise(r => setTimeout(r, 1000 * s));
const pickRand = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)]
}
const randTask = () => ({
    date: '2020-01-03',
    duration: 3, 
    id: randStr(8),
    note: 'note ' + randStr(4)
})

const role: UserRoleEnum = 'manager'
const randProfile = () => ({
    user: {
        id: randStr(8),
        username: 'user ' + randStr(4)
    },
    preferences: {
        working_hours_enabled: true,
        preferred_working_hours: 5
    },
    role: {
        role
    }
})

use_mocks['login'] && (
    api.login = async () => {
        await wait(1)
        return {
            ...randProfile(),
            token: '32459843759832',
        }
    }
)

use_mocks['profile'] && (
    api.profile = async () => {
        await wait(1)
        return randProfile()
    }
)

use_mocks['tasks'] && (
    api.tasks = () => async () => {
        await wait(1)
        return [
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
            randTask(),
        ]
    }
)

use_mocks['deleteTask'] && (
    api.deleteTask = async () => {
        await wait(1)
    }
)

use_mocks['deleteUser'] && (
    api.deleteUser = async () => {
        await wait(1)
    }
)

use_mocks['updateTask'] && (
    api.updateTask = () => async () => {
        await wait(1)
        return randTask()
    }
)

use_mocks['updateUserRole'] && (
    api.updateUserRole = () => async () => {
        await wait(1)
        return { role: 'admin' }
    }
)



use_mocks['updateUserPrefs'] && (
    api.updateUserPrefs = () => async () => {
        await wait(1)
        return {
            preferred_working_hours: 4,
            working_hours_enabled: false
        }
    }
)

use_mocks['users'] && (
    api.users = async () => {
        await wait(1)
        return [
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
            randProfile(),
        ]
    }
)