import { Db } from 'mongodb';
import 'module-alias/register';
import { collections_config } from '@server/db/init_functions/config';
import { mongo_url } from '@server/config';
import { connectToMongo } from '@server/db/controllers/mongo_controllers';
import { initializeAdmin } from '@server/db/init_functions/initialize_admin';

async function createCollection({
  db,
  name,
  schema,
}: {
  db: Db;
  name: string;
  schema: any;
}) {
  await db.createCollection(name, {
    validator: {
      $jsonSchema: schema,
    },
  });
}

async function createIndexes({
  db,
  name,
  indexes,
  special_indexes,
}: {
  db: Db;
  name: string;
  indexes: any;
  special_indexes: any;
}) {
  let promises = [];
  const collection = db.collection(name);
  if (indexes) {
    promises.push(collection.createIndex(indexes));
  }
  if (special_indexes) {
    const special_creations = special_indexes.map((func: any) =>
      func(collection)
    );
    promises.push(...special_creations);
  }
  return Promise.all(promises);
}

export async function initializeCollections(db: Db) {
  const creation_promises = collections_config.map((config) =>
    createCollection({
      db,
      name: config.name,
      schema: config.schema,
    })
  );
  await Promise.all(creation_promises);
  const index_promises = collections_config.map((config) =>
    createIndexes({
      db,
      name: config.name,
      indexes: config.indexes,
      special_indexes: config.special_indexes,
    })
  );
  await Promise.all(index_promises);
}

(async () => {
  const db = await connectToMongo({ url: mongo_url });
  await initializeCollections(db);
  console.log('Initialized all collections !');
  await initializeAdmin();
  return process.exit(0);
})();
