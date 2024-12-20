import { Request, Response, NextFunction } from 'express';
import { GetTasksQuery } from '@server/types'
import { TasksService } from '@server/services/tasks.service';
import { view_mapping } from '@server/view_mapping';

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  const { start_date, end_date } = req.query;
  const get_tasks_input: GetTasksQuery = {
    user_id,
    start_date ,
    end_date,
  };
  const tasks_service = new TasksService();
  const tasks = await tasks_service.getTasks(get_tasks_input);
  const data = view_mapping.taskListToTaskDtoList(tasks);
  res.status(200).json(data);
}
