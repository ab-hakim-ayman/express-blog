import express from 'express';
import adminRouters from '../modules/Admin/admin.routes';
import BlogRoutes from '../modules/Blog/blog.routes';
import CategoryRoutes from '../modules/Category/Category.routes';

const router = express.Router();

const moduleRoutes = [
	{
		path: '/categories',
		route: CategoryRoutes
	},
	{
		path: '/admin',
		route: adminRouters
	},
	{
		path: '/blogs',
		route: BlogRoutes
	}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
