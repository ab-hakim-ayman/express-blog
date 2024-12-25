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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const comment_model_1 = __importDefault(require("../Comment/comment.model"));
const Category_model_1 = __importDefault(require("./Category.model"));
const CreateCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_model_1.default.create(data);
    return category;
});
const GetCategories = (searchTerm, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};
    const categories = yield Category_model_1.default.find(query).skip(skip).limit(limit);
    const totalCategories = yield Category_model_1.default.countDocuments(query);
    const totalPages = Math.ceil(totalCategories / limit);
    const page = Math.ceil(skip / limit) + 1;
    const meta = {
        limit,
        page,
        totalPages,
        totalItems: totalCategories
    };
    return { meta, categories };
});
const GetCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_model_1.default.findById(id);
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return category;
});
const UpdateCategoryById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_model_1.default.findByIdAndUpdate(id, data, { new: true });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return category;
});
const DeleteCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Ensure the category exists before attempting deletion
    yield GetCategoryById(categoryId);
    const session = yield Category_model_1.default.startSession();
    try {
        session.startTransaction();
        // Find blogs related to the category
        const blogs = yield blog_model_1.default.find({ category: categoryId }).session(session);
        const blogIds = blogs.map((blog) => blog._id); // Extract blog IDs
        // Delete blogs related to the category
        yield blog_model_1.default.deleteMany({ category: categoryId }).session(session);
        // Delete comments related to the blogs
        if (blogIds.length > 0) {
            yield comment_model_1.default.deleteMany({ blogId: { $in: blogIds } }).session(session);
        }
        // Finally, delete the category
        const category = yield Category_model_1.default.findByIdAndDelete(categoryId).session(session);
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return category;
    }
    catch (error) {
        // Roll back the transaction
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, (_a = error.message) !== null && _a !== void 0 ? _a : 'An error occurred while deleting the category');
    }
});
exports.default = {
    CreateCategory,
    GetCategories,
    GetCategoryById,
    UpdateCategoryById,
    DeleteCategoryById
};
