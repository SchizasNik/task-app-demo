import { Router } from 'express';
import {
  validateGetTasks,
  validateCreateTask,
  validateEditTask,
  validateDeleteTask,
} from '@server/validations';
import { getTasks } from './get_tasks.route';
import { downloadTasks } from './download_tasks.route';
import { createTask } from './create_task.route';
import { editTask } from './edit_task.route';
import { deleteTask } from './delete_task.route';
import { catchRoute } from '@server/errors/catch_route';
import { getTaskOwner, canCRUDTasks } from '@server/middleware';

const router = Router();

router.get(
  '/users/:user_id/tasks/list',
  validateGetTasks,
  canCRUDTasks,
  catchRoute(getTasks)
);

router.get(
  '/users/:user_id/tasks/list/download',
  validateGetTasks,
  canCRUDTasks,
  catchRoute(downloadTasks)
);

router.post(
  '/users/:user_id/tasks',
  validateCreateTask,
  canCRUDTasks,
  catchRoute(createTask)
);

router.put(
  '/tasks/:task_id',
  validateEditTask,
  getTaskOwner,
  canCRUDTasks,
  catchRoute(editTask)
);

router.delete(
  '/tasks/:task_id',
  validateDeleteTask,
  getTaskOwner,
  canCRUDTasks,
  catchRoute(deleteTask)
);

export { router as tasksRouter };
