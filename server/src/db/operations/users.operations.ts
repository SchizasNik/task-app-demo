import { getDb } from '@server/db/controllers/mongo_controllers';
import { ObjectID } from 'mongodb';
import { UserMongo, UserRoleEnum, UserDao, UserBase, Credentials, UserRole } from '@server/types';

const mongo = getDb();

export class UsersOperations {

  async getUserByUsername(username: string) {
    const user = await mongo.Users().findOne({ username });
    if (!user) return null;
    const serialized_user = this.serializeSingleUser(user);
    return serialized_user;
  }
  
  async getUserById(id: string) {
    const user = await mongo.Users().findOne({ _id:new ObjectID(id) } as any);
    if (!user) return null;
    const serialized_user = this.serializeSingleUser(user);
    return serialized_user;
  }
  
  async storeUser({
    username,
    password,
    role,
  }: Credentials & UserRole) {
    const new_user : UserBase = {
      username,
      password,
      role,
      preferred_working_hours: 8,
      working_hours_enabled: false,
    }
    const result = await mongo.Users().insertOne(new_user as any);
    return result;
  }
  
  async getUsers(roles: UserRoleEnum[], id:string) {
    const users: UserMongo[] = await mongo
      .Users()
      .find({ role: { $in: roles }, _id:{$ne:new ObjectID(id)} })
      .toArray();
    const serialized_users = this.serializeUsers(users);
    return serialized_users;
  }
  
  async replaceUser(user: UserDao, id:string){
    const updated_user = await mongo.Users().replaceOne({ _id:new ObjectID(id)} as any, user as any, {upsert:true});
    return updated_user;
  }
  
  async deleteUserById(id:string){
    const delete_user = await mongo.Users().deleteOne({ _id:new ObjectID(id)} as any);
    return delete_user;
  }

  private serializeSingleUser(user: UserMongo): UserDao {
    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password,
      role: user.role,
      preferred_working_hours: user.preferred_working_hours,
      working_hours_enabled: user.working_hours_enabled,
    };
  }

  private serializeUsers(users: UserMongo[]): UserDao[] {
    return users.map(this.serializeSingleUser);
  }
}