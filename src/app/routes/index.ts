import express from 'express';
import adminRouters from '../modules/Admin/admin.routes';
import BlogRoutes from '../modules/Blog/blog.routes';
import CategoryRoutes from '../modules/Category/Category.routes';
import CommentRoutes from '../modules/Comment/comment.routes';
import SystemRoutes from '../modules/system/system.routes';

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
	},
	{
		path: '/comments',
		route: CommentRoutes
	},
	{
		path: '/system',
		route: SystemRoutes
	}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
