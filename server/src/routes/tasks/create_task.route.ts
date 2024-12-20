import { Request, Response, NextFunction } from 'express';
import { CreateTaskReq } from '@server/types'
import { TasksService } from '@server/services/tasks.service';
import { view_mapping } from '@server/view_mapping';

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = req.params.user_id;
  const { date, duration, note } = req.body;
  const create_task_input: CreateTaskReq = {
    user_id,
    date,
    duration,
    note,
  };
  const tasks_service = new TasksService();
  const task = await tasks_service.createTask(create_task_input);
  const data = view_mapping.taskToTaskDto(task);
  res.status(201).json(data);
}
