import { Collection } from 'mongodb';
import { user_schema, task_schema, invitation_schema } from '../schemas';

const seconds_in_a_day = 60 * 60 * 24;

export const collections_config = [
  {
    name: 'Users',
    schema: user_schema,
    indexes: {
      username: 1,
    },
  },
  {
    name: 'Tasks',
    schema: task_schema,
    indexes: {
      user_id: 1,
      date: 1,
    },
  },
  {
    name: 'Invitations',
    schema: invitation_schema,
    indexes: {
      uuid: 1,
    },
    special_indexes: [created_at],
  },
];

async function created_at(collection: Collection) {
  await collection.createIndex(
    { created_at: 1 },
    { expireAfterSeconds: seconds_in_a_day }
  );
}
