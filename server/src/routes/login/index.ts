import { Router } from 'express';
import { loginUserRoute } from '@server/routes/login/login.route';
import { catchRoute } from '@server/errors/catch_route';

export const router = Router();

router.post('/', catchRoute(loginUserRoute))
