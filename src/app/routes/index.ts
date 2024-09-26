import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/Users/user.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { MetaRoutes } from '../modules/Meta/meta.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/meta',
    route: MetaRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
