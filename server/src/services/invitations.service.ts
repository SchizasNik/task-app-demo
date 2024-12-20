import { InvitationOperations } from '@server/db/operations/invitation.operations';
import {
  UserRoleEnum,
  Invitation,
} from '@server/types';
import { v4 as uuidv4 } from 'uuid';
import { createToken } from '@server/utils/auth';
import { invitation_expiration } from '@server/config';
import { CustomError } from '@server/errors/error_handler';

export class InvitationsService {
  async createInvitation(role: UserRoleEnum, user_role:UserRoleEnum) {
    if (user_role === 'manager' && role !== 'user') throw new CustomError('forbidden');
    const uuid = uuidv4();
    const signed_uuid = createToken<Invitation>({invitation_token:uuid},invitation_expiration);
    const invitation_ops = new InvitationOperations();
    const invitation = await invitation_ops.createInvitation({
      uuid,
      role,
    });
    return signed_uuid;
  }
}
