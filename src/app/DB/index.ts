import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { TUser } from '../modules/user/user.interface';

const superUser: TUser = {
  firstName: 'Oko',
  lastName: 'Biscuit',
  photo: 'https://i.ibb.co/tHnL3Ld/creative.png',
  email: 'superAdmin@gmail.com',
  password: config.super_admin_password || '787898',
  role: USER_ROLE.superAdmin,
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
