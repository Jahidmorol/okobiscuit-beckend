import express from 'express';
import { MetaController } from './meta.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Users/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.seller),
  MetaController.FetchDashboardMetaData,
);

router.get(
  '/order-chart',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.seller),
  MetaController.OrderAreaChart,
);

export const MetaRoutes = router;
