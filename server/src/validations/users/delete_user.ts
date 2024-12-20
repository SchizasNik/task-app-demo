import { celebrate, Joi } from 'celebrate';
import {types} from '@server/validations/validation.types';

const input = {
    params: Joi.object({
        user_id: types.object_id
    })
}

export const validateDelete = celebrate(input);
