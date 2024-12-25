"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("../modules/Admin/admin.routes"));
const blog_routes_1 = __importDefault(require("../modules/Blog/blog.routes"));
const Category_routes_1 = __importDefault(require("../modules/Category/Category.routes"));
const comment_routes_1 = __importDefault(require("../modules/Comment/comment.routes"));
const system_routes_1 = __importDefault(require("../modules/system/system.routes"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/categories',
        route: Category_routes_1.default
    },
    {
        path: '/admin',
        route: admin_routes_1.default
    },
    {
        path: '/blogs',
        route: blog_routes_1.default
    },
    {
        path: '/comments',
        route: comment_routes_1.default
    },
    {
        path: '/system',
        route: system_routes_1.default
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
