import { celebrate, Joi } from 'celebrate';
import { types } from '../validation.types';

export const validateCreateInvitation = celebrate({
  body: Joi.object({
    role: types.role,
  }),
});
