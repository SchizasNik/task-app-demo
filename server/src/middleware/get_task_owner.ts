import { Request, Response, NextFunction } from 'express';
import { TasksOperations } from '@server/db/operations/tasks.operations';
import { catchRoute } from '@server/errors/catch_route';
import { CustomError } from '@server/errors/error_handler';

export const getTaskOwner = catchRoute(_getTaskOwner);

async function _getTaskOwner(req: Request, res: Response, next: NextFunction){
    const {task_id}         = req.params;
    const task_operation    = new TasksOperations();
    const task              = await task_operation.getTaskById(task_id);
    if (!task) throw new CustomError('missing_task');
    res.locals.owner_id     = task.user_id;
    next();
}
