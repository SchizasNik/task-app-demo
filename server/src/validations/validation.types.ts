import { Joi } from 'celebrate';

export const types = {
  date: Joi.string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .custom(validateDate)
    .required(),
  duration: Joi.number().min(0).required(),
  invitation_token: Joi.optional(),
  note: Joi.string().required(),
  object_id: Joi.string()
    .regex(/^[a-zA-Z0-9]{24}$/)
    .required(),
  password: Joi.string().min(5).max(40).required(),
  preferred_working_hours: Joi.number().min(0).max(24).required(),
  role: Joi.string().valid('user', 'manager', 'admin').required(),
  username: Joi.string().min(3).max(20).required(),
  working_hours_enabled: Joi.boolean().required(),
  token: Joi.string().optional(),
};

function validateDate(value: any, helpers: any) {
  const [year, month, day] = value.split('-');
  const date_object = new Date(value);
  const time = date_object.getTime();
  const is_invalid = isNaN(time);
  if (is_invalid) return helpers.error('any.invalid');
  const is_valid_day = date_object.getDate() === parseInt(day);
  if (!is_valid_day) return helpers.error('any.invalid');
  // return value - valid
  return value;
}
