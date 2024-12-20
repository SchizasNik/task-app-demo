import { role_schema } from './role.schema';

export const invitation_schema = {
  bsonType: 'object',
  required: ['uuid', 'role'],
  properties: {
    uuid: {
      bsonType: 'string',
      description: 'Must be a valid uuid and is required'
    },
    role: role_schema
  }
};
