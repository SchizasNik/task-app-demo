import { celebrate, Joi } from 'celebrate';
import {types} from '@server/validations/validation.types';

const input = {
    params: Joi.object({
        user_id: types.object_id
    }),
    body: Joi.object({
            role : types.role
        })
}

export const validateRole = celebrate(input);
