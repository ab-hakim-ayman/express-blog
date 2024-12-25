"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deleteCloudinaryImage_1 = __importDefault(require("../../utils/deleteCloudinaryImage"));
const Category_model_1 = __importDefault(require("../Category/Category.model"));
const comment_model_1 = __importDefault(require("../Comment/comment.model"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlog = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new blog_model_1.default(Object.assign({}, blogData));
    yield blog.save();
    return blog;
});
const getBlogById = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(blogId).populate('category');
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found!');
    }
    return blog;
});
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findOne({ slug }).populate('category');
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found!');
    }
    return blog;
});
const updateBlog = (blogId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found!');
    }
    Object.assign(blog, updateData);
    yield blog.save();
    return blog;
});
const getBlogs = (searchQuery, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const queryCondition = {};
    const { category, search } = searchQuery;
    if (category) {
        const categoryData = yield Category_model_1.default.findOne({ slug: category });
        if (categoryData) {
            queryCondition.category = categoryData._id;
        }
    }
    if (search) {
        queryCondition.$or = [
            { title: { $regex: search, $options: 'i' } },
            { metaDescription: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
        ];
    }
    const blogs = yield blog_model_1.default.find(queryCondition).skip(skip).limit(limit).populate('category').sort({ createdAt: -1 });
    const totalBlogs = yield blog_model_1.default.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalBlogs / limit);
    const page = Math.ceil(skip / limit) + 1;
    return {
        blogs,
        meta: {
            limit,
            page,
            totalPages,
            totalItems: totalBlogs
        }
    };
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const session = yield blog_model_1.default.startSession();
    try {
        // Start transaction
        session.startTransaction();
        // Find the blog with the session
        const blog = yield blog_model_1.default.findById(blogId).session(session);
        if (!blog) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found or not authorized!');
        }
        // Delete related comments with the session
        yield comment_model_1.default.deleteMany({ blogId }).session(session);
        // Delete the blog itself
        yield blog_model_1.default.findByIdAndDelete(blogId).session(session);
        yield (0, deleteCloudinaryImage_1.default)((_a = blog === null || blog === void 0 ? void 0 : blog.image) === null || _a === void 0 ? void 0 : _a.publicId);
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return blog;
    }
    catch (error) {
        // Rollback transaction on error
        yield session.abortTransaction();
        session.endSession();
        // Re-throw error
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, (_b = error.message) !== null && _b !== void 0 ? _b : 'An error occurred while deleting the blog!');
    }
});
exports.BlogServices = {
    createBlog,
    updateBlog,
    getBlogs,
    getBlogById,
    getBlogBySlug,
    deleteBlog
};
