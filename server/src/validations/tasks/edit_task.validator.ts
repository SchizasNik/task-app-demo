import { celebrate, Joi } from 'celebrate';
import { types } from '../validation.types';

export const validateEditTask = celebrate({
  params: Joi.object({
    task_id: types.object_id,
  }),
  body: Joi.object({
    date: types.date,
    duration: types.duration,
    note: types.note,
  }),
});
