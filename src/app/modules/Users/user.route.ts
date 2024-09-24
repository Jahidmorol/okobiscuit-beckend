import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.createUserValidationSchema),
  userControllers.createAdmin,
);

router.post(
  '/seller',
  validateRequest(UserValidation.createUserValidationSchema),
  userControllers.createSeller,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.seller),
  userControllers.getMe,
);

router.get('/all', userControllers.getAllUser);

router.patch(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.seller),
  validateRequest(UserValidation.updateUserValidationSchema),
  userControllers.updateMe,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  userControllers.deleteUser,
);

export const userRoutes = router;
