import { Router } from 'express';
import { validateCreateInvitation } from '@server/validations';
import { createInvitation } from './create_invitation.route';
import { catchRoute } from '@server/errors/catch_route';
import { isManagment } from '@server/middleware';

const router = Router();

router.post(
  '/invitations',
  isManagment,
  validateCreateInvitation,
  catchRoute(createInvitation)
);

export { router as invitationsRouter };
