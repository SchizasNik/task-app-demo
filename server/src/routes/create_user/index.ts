import { Router } from 'express';
import { createUserRouter } from '@server/routes/create_user/create_user.route';
import { catchRoute } from '@server/errors/catch_route';

export const router = Router();

router.post('/', catchRoute(createUserRouter))

