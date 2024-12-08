import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
	port: process.env.PORT,
	database_url: process.env.DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
	jwt_secret: process.env.JWT_SECRET as string,
	jwt_expiration: process.env.JWT_EXPIRATION as string,
	super_admin_email: process.env.SUPER_ADMIN_EMAIL,
	super_admin_password: process.env.SUPER_ADMIN_PASSWORD
};
