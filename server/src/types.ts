import { ObjectId } from 'mongodb';

export type Token = {
  token: string;
};

export type Expiration = {
  expiresIn: string;
};

// User types
export type UserId = {
  user_id: string;
};

export type UserRoleEnum = 'user' | 'manager' | 'admin';

export type UserRole = {
  role: UserRoleEnum;
};

export type User = {
  id: string;
  username: string;
};

export type UserPrefs = {
  preferred_working_hours: number;
  working_hours_enabled: boolean;
};

export type Credentials = {
  username: string;
  password: string;
};

export type UserMongo = UserBase & {
  _id: ObjectId;
};

export type UserDao = UserBase & {
  id: string;
};

export type UserBase = {
  username: string;
  password: string;
  role: UserRoleEnum;
  preferred_working_hours: number;
  working_hours_enabled: boolean;
};

export type Profile = {
  user: User;
  preferences: UserPrefs;
  role: UserRole;
};

// Invitation types
export type InvitationBase = {
  uuid: string;
  role: UserRoleEnum;
};

export type InvitationMongo = InvitationBase & { _id: ObjectId; created_at: Date };

export type InvitationDao = InvitationBase & { id: string; created_at: Date };

export type Invitation = {
  invitation_token: string;
};
// tasks types

export type Task_Base = {
  date: string;
  duration: number;
  note: string;
  user_id: string;
};

export type TaskMongo = Task_Base & {
  _id: ObjectId;
};

export type TaskDao = Task_Base & {
  id: string;
};

export type GetTasksQuery = {
  user_id: string;
  start_date: string;
  end_date: string;
};

export type CreateTaskReq = {
  user_id: string;
  date: string;
  duration: number;
  note: string;
};

export type EditTaskReq = {
  id: string;
  date: string;
  duration: number;
  note: string;
};
