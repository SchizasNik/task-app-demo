import { celebrate, Joi } from 'celebrate';
import { types } from '../validation.types';

export const validateGetTasks = celebrate({
  params: Joi.object({
    user_id: types.object_id,
  }),
  query: Joi.object({
    start_date: types.date,
    end_date: types.date,
    token:types.token
  }),
});
