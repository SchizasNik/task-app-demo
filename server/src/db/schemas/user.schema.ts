import { role_schema } from './role.schema';

export const user_schema = {
  bsonType: 'object',
  required: [
    'username',
    'password',
    'preferred_working_hours',
    'working_hours_enabled',
    'role'
  ],
  properties: {
    username: {
      bsonType: 'string',
      minLength: 3,
      maxLength: 20,
      description: 'Must be a string and is required',
    },
    password: {
      bsonType: 'string',
      minLength: 5,
      maxLength: 100,
      description: 'Must be a string (hashed password) and is required.',
    },
    preferred_working_hours: {
      bsonType: 'int',
      minimum: 0,
      maximum: 24,
      description: 'Must be a number between 0 and 24 and is required.'
    },
    working_hours_enabled: {
      bsonType: 'bool',
      description: 'Must be a boolean and is required.',
    },
    role: role_schema,
  },
};
