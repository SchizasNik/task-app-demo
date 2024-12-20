import { TasksOperations } from '@server/db/operations/tasks.operations';
import { GetTasksQuery, CreateTaskReq, EditTaskReq } from '@server/types';
import { tasksToHTML } from './tasks_to_html.util';
import { CustomError } from '@server/errors/error_handler';

export class TasksService {
  async getTasks(get_tasks_input: GetTasksQuery) {
    const tasks_ops = new TasksOperations();
    const tasks = await tasks_ops.getTasks(get_tasks_input);
    return tasks;
  }

  async createTask(create_task_input: CreateTaskReq) {
    const tasks_ops = new TasksOperations();
    const task = await tasks_ops.createTask(create_task_input);
    return task;
  }

  async editTask(edit_task_input: EditTaskReq) {
    const tasks_ops = new TasksOperations();
    const task = await tasks_ops.editTask(edit_task_input);
    if (!task) throw new CustomError('missing_task');
    return task;
  }

  async deleteTask(id: string) {
    const tasks_ops = new TasksOperations();
    const task = await tasks_ops.getTaskById(id);
    if (!task) throw new CustomError('missing_task');
    await tasks_ops.deleteTask(id);
  }
}
