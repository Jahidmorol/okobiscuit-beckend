import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.Database_Url,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_lINK,
  nodemailer_user_email: process.env.NODEMAILER_USER_EMAIL,
  nodemailer_user_pass: process.env.NODEMAILER_USER_PASS,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
