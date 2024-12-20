import { Request, Response, NextFunction } from 'express';
import { GetTasksQuery } from '@server/types'
import { TasksService } from '@server/services/tasks.service';
import { tasksToHTML } from '@server/services/tasks_to_html.util';

export async function downloadTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  const { start_date, end_date } = req.query;
  const get_tasks_input: GetTasksQuery = {
    user_id,
    start_date,
    end_date,
  };
  const tasks_service = new TasksService();
  const tasks = await tasks_service.getTasks(get_tasks_input);
  const html_string = tasksToHTML(tasks)
  res.set({ 'Content-Disposition': 'attachment; filename="tasks.html"' });
  res.send(html_string);
}
