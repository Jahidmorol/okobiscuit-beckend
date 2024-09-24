import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ServiceRoutes } from '../modules/Service/service.route';
import { ReviewsRoutes } from '../modules/Reviews/reviews.route';
import { BannersRoutes } from '../modules/Banner/banner.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { CareerRoutes } from '../modules/Career/career.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
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
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
