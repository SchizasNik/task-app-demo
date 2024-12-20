import { getDb } from '@server/db/controllers/mongo_controllers';
import { admin_pass, saltRounds } from '@server/config';
import bcrypt from 'bcrypt';
import { UsersOperations } from '@server/db/operations/users.operations';

export async function initializeAdmin() {
  const db = getDb();
  try {
    const doc = await db.Users().findOne({ username: 'admin' });
    if (!doc) {
      const username = 'admin';
      const hass_pass = bcrypt.hashSync(admin_pass, saltRounds);
      const users_operations = new UsersOperations();
      await users_operations.storeUser({
        username,
        password: hass_pass,
        role: 'admin',
      });
      console.log('Created admin user');
    }
  } catch (error) {
    console.error('could not initialize admin', error);
  }
}
