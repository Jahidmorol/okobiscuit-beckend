import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from './order.validation';
import { ProductController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Users/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createProductValidationSchema),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProduct);

router.get('/:id', ProductController.getSingleProduct);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateProductValidationSchema),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
