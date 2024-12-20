import { celebrate, Joi } from 'celebrate';
import { types } from '../validation.types';

export const validateDeleteTask = celebrate({
  params: Joi.object({
    task_id: types.object_id,
  })
});
