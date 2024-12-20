import { secret_key } from '@server/config';
import { Expiration } from '@server/types';

const jwt = require('jsonwebtoken');

export function createToken<T>(obj: T, expiration:Expiration) {
  const token : string = jwt.sign(obj, secret_key, expiration);
  return token;
}

export function validateToken<T>(token: string) {
  try {
    const decoded: T = jwt.verify(token, secret_key);
    return decoded;
  } catch (err) {
    console.error(err);
  }
}
