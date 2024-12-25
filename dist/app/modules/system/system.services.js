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
exports.SystemServices = void 0;
const deleteCloudinaryImage_1 = __importDefault(require("../../utils/deleteCloudinaryImage"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const Category_model_1 = __importDefault(require("../Category/Category.model"));
const comment_model_1 = __importDefault(require("../Comment/comment.model"));
const DashboardStates = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalBlogs = yield blog_model_1.default.countDocuments();
    const totalComments = yield comment_model_1.default.countDocuments();
    const totalCategories = yield Category_model_1.default.countDocuments();
    return {
        totalBlogs,
        totalComments,
        totalCategories
    };
});
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, deleteCloudinaryImage_1.default)(publicId);
    return res;
});
exports.SystemServices = {
    DashboardStates,
    deleteImage
};
