const { env } = process

export const mongo_url  = env.TOP_MONGO_URL || "mongodb://localhost:27017/taskApp";
export const PORT       = env.TOP_PORT || '3012';
export const secret_key = env.TOP_SECRET_KEY || '3B$T3tb#$Ts43tvstB';
export const admin_pass = env.ADMIN_PASS || 'w2E1ae2f$S';
export const saltRounds = 10;
export const expiration = {expiresIn:'10d'};
export const invitation_expiration = {expiresIn:'1d'}