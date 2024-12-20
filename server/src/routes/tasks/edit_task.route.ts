import { Request, Response, NextFunction } from 'express';
import { EditTaskReq } from '@server/types'
import { TasksService } from '@server/services/tasks.service';
import { view_mapping } from '@server/view_mapping';

export async function editTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { task_id } = req.params;
  const { date, duration, note } = req.body;
  const edit_task_input: EditTaskReq = {
    id:task_id,
    date,
    duration,
    note,
  };
  const tasks_service = new TasksService();
  const task = await tasks_service.editTask(edit_task_input);
  const data = view_mapping.taskToTaskDto(task);
  res.status(200).json(data);
}
