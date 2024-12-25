"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controllers_1 = require("./blog.controllers");
const blog_validations_1 = __importDefault(require("./blog.validations"));
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(blog_validations_1.default.createBlogValidation), blog_controllers_1.BlogControllers.createBlog);
router.get('/', blog_controllers_1.BlogControllers.getBlogs);
router.get('/:id', blog_controllers_1.BlogControllers.getBlog);
router.get('/slug/:slug', blog_controllers_1.BlogControllers.getBlogBySlug);
router.put('/:id', (0, adminAuth_1.default)('admin'), (0, validateRequest_1.default)(blog_validations_1.default.updateBlogValidation), blog_controllers_1.BlogControllers.updateBlog);
router.delete('/:id', (0, adminAuth_1.default)('admin'), blog_controllers_1.BlogControllers.deleteBlog);
const BlogRoutes = router;
exports.default = BlogRoutes;
