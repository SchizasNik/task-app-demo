import { Request, Response, NextFunction } from 'express';
import { InvitationsService } from '@server/services/invitations.service';
import { view_mapping } from '@server/view_mapping';
import { UserDao, UserRoleEnum } from '@server/types';

export async function createInvitation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const role : UserRoleEnum = req.body.role;
  const user : UserDao      = res.locals.user;
  const user_role = user.role;
  const invitations_service = new InvitationsService();
  const signed_uuid = await invitations_service.createInvitation(role, user_role);
  const data = view_mapping.uuidToInvitation(signed_uuid);
  res.status(201).json(data);
}
