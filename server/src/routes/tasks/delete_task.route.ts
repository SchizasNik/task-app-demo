import { Request, Response, NextFunction } from 'express';
import { TasksService } from '@server/services/tasks.service';

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { task_id } = req.params;
  const tasks_service = new TasksService();
  await tasks_service.deleteTask(task_id);
  res.status(204).end();
}
