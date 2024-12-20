export type Clb<T> = () => T

export type Dictionary<T> = {
    [key:string]: T
}

export type DateRange = {
    start_date: string
    end_date: string
}

export type Credentials = {
    username: string
    password: string
}

export type User = {
    id: string
    username: string
}

export type NewTask = {
    date: string
    duration: number
    note: string
}

export type Task = NewTask & {
    id: string
}

export type UserPrefs = {
    preferred_working_hours: number,
    working_hours_enabled: boolean
}

export type UserRoleEnum = 'user' | 'manager' | 'admin'

export type UserRole = {
    role: UserRoleEnum
}

export type Profile = {
    user: User,
    preferences: UserPrefs,
    role: UserRole
}

export type Token = {
    token: string
}

export type Invitation = {
    invitation_token: string
}