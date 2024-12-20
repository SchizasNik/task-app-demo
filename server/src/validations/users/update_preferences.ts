import { celebrate, Joi } from 'celebrate';
import {types} from '@server/validations/validation.types';

const input = {
    params: Joi.object({
        user_id: types.object_id
    }),
    body: Joi.object({
            preferred_working_hours : types.preferred_working_hours,
            working_hours_enabled   : types.working_hours_enabled
        })
}

export const validatePrefs = celebrate(input);
