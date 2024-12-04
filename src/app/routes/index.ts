import express from "express";
import adminRouters from "../modules/Admin/admin.routes";
import CategoryRoutes from "../modules/Category/Category.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/admin",
    route: adminRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
