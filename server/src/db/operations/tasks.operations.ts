import { ObjectID } from 'mongodb';
import { getDb } from '@server/db/controllers/mongo_controllers';
import {
  GetTasksQuery,
  TaskMongo,
  TaskDao,
  CreateTaskReq,
  EditTaskReq,
} from '@server/types'

export class TasksOperations {
  private db = getDb();

  async getTasks({ user_id, start_date, end_date }: GetTasksQuery) {
    const tasks = await this.db
      .Tasks()
      .find({
        user_id,
        date: { $gte: start_date, $lte: end_date },
      })
      .sort({ date: -1 })
      .toArray();
    const serialized_tasks = this.serializeTasks(tasks);
    return serialized_tasks;
  }

  async getTaskById(id: string) {
    const task = await this.db
      .Tasks()
      .findOne({ _id: new ObjectID(id) } as any);
    if (!task) return null;
    const serialized_task = this.serializeSingleTask(task);
    return serialized_task;
  }

  private serializeSingleTask(task: TaskMongo): TaskDao {
    return {
      id: task._id.toString(),
      date: task.date,
      duration: task.duration,
      note: task.note,
      user_id: task.user_id,
    };
  }

  private serializeTasks(tasks: TaskMongo[]): TaskDao[] {
    return tasks.map(this.serializeSingleTask);
  }

  async createTask({ user_id, date, duration, note }: CreateTaskReq) {
    const result = await this.db.Tasks().insertOne({
      user_id,
      date,
      duration,
      note,
    } as TaskMongo);
    const [task] = result.ops;
    return this.serializeSingleTask(task);
  }

  async editTask({ id, date, duration, note }: EditTaskReq) {
    const result = await this.db.Tasks().findOneAndUpdate(
      { _id: new ObjectID(id) } as any,
      {
        $set: {
          date,
          duration,
          note,
        },
      },
      {
        returnOriginal: false,
      }
    );
    const task = result.value;
    if (!task) return null;
    return this.serializeSingleTask(task);
  }

  async deleteTask(id: string) {
    await this.db.Tasks().deleteOne({ _id: new ObjectID(id) } as any);
  }
}
