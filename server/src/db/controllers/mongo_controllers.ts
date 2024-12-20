import { Db, MongoClient } from 'mongodb';
import { TaskMongo } from '@server/types'
import { UserMongo, InvitationMongo } from '@server/types';

let _db: Db | null;

export async function connectToMongo({ url }: { url: string }) {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    _db = client.db();
    console.log('MongoDB Connection Established @ ', url);
    _db.on('close', () => {
      console.error('Mongo connection closed');
      return process.exit(-1);
    });

    return _db;
  } catch (err) {
    console.error(err);
    console.error('Mongo connection errored, restarting...');
    return process.exit(-1);
  }
}

const getCollectionController = <T>(name: string) => () =>
  _db!.collection<T>(name);

export function getDb() {
  return {
    Users: getCollectionController<UserMongo>('Users'),
    Tasks: getCollectionController<TaskMongo>('Tasks'),
    Invitations: getCollectionController<InvitationMongo>('Invitations'),
  };
}
