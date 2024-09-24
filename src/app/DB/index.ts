import config from '../config';
import { USER_ROLE } from '../modules/Users/user.constant';
import { TUser } from '../modules/Users/user.interface';
import { User } from '../modules/Users/user.model';

const superUser: TUser = {
  name: 'OkoBiscuit',
  photo: 'https://i.ibb.co/tHnL3Ld/creative.png',
  email: 'superAdmin@gmail.com',
  password: config.super_admin_password || '787898',
  role: USER_ROLE.superAdmin,
  isAdminApproved: true,
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
