import { getDb } from '@server/db/controllers/mongo_controllers';
import {
  InvitationMongo,
  InvitationDao,
  InvitationBase,
} from '@server/types';
const mongo = getDb();

export class InvitationOperations {
  async getInvitation(uuid: string) {
    const invitation = await mongo.Invitations().findOne({ uuid });
    if (!invitation) return null;
    const serialized_invitation = this.serializeSingleInvitation(invitation);
    return serialized_invitation;
  }

  async createInvitation({ uuid, role }: InvitationBase) {
    const result = await mongo.Invitations().insertOne({
      uuid,
      role,
      created_at: new Date(),
    } as any);
    const [invitation] = result.ops;
    return this.serializeSingleInvitation(invitation);
  }

  async removeInvitation(uuid: string) {
    const invitation = await mongo.Invitations().deleteOne({ uuid });
    return invitation;
  }

  private serializeSingleInvitation(invitation: InvitationMongo): InvitationDao {
    return {
      id: invitation._id.toString(),
      uuid: invitation.uuid,
      role: invitation.role,
      created_at: invitation.created_at,
    };
  }
}
