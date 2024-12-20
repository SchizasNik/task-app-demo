import { celebrate, Joi } from 'celebrate';
import {types} from '@server/validations/validation.types';

const input = {
    body: Joi.object({
            username    : types.username,
            password    : types.password
        })
}

export const validateLogin = celebrate(input);
