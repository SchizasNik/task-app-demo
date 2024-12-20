export const task_schema = {
  bsonType: 'object',
  required: ['user_id', 'date', 'duration', 'note'],
  properties: {
    user_id: {
      bsonType: 'string',
      description: 'Must be a mongo id string and is required.'
    },
    date: {
      bsonType: 'string',
      pattern:'^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
      description: 'Must be a date string and is required'
    },
    duration: {
      bsonType: 'int',
      minimum: 0,
      maximum: 24,
      description: 'Must be a number between 0 and 24 and is required.'
    },
    note: {
      bsonType: 'string',
      minLength: 1,
      maxLength: 2000,
      description: 'Must be a string and is required'
    }
  }
};
