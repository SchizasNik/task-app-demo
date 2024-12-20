import { celebrate, Joi } from 'celebrate';
import { types } from '../validation.types';

export const validateCreateTask = celebrate({
  params: Joi.object({
    user_id: types.object_id,
  }),
  body: Joi.object({
    date: types.date,
    duration: types.duration,
    note: types.note,
  }),
});
