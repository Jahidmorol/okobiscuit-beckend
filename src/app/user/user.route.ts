import express from 'express';
import { userControllers } from './user.controller';

import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.createUserValidationSchema),
  userControllers.createAdmin,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  userControllers.getMe,
);

router.get('/all', userControllers.getAllUser);

router.patch(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  validateRequest(UserValidation.updateUserValidationSchema),
  userControllers.updateMe,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  userControllers.deleteUser,
);

export const userRoutes = router;
