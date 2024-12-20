import { celebrate, Joi } from 'celebrate';
import {types} from '@server/validations/validation.types';

// validate only username & password
// if invitation_token is wrong we want to continue 
// the create user process
const input = {
    body: Joi.object().keys({
            username    : types.username,
            password    : types.password,
            invitation_token : types.invitation_token
        })
}

export const validateUser = celebrate(input);
