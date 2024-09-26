import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createOrderValidationSchema,
  updateOrderValidationSchema,
} from './order.validation';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Users/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.seller),
  validateRequest(createOrderValidationSchema),
  OrderController.createOrder,
);

router.get('/', OrderController.getAllOrder);

router.get('/:id', OrderController.getSingleOrder);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.seller),
  validateRequest(updateOrderValidationSchema),
  OrderController.updateOrder,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.seller),
  OrderController.deleteOrder,
);

export const OrderRoutes = router;
