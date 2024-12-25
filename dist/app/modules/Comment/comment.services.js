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
exports.CommentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const createComment = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the blog exists
    const blog = yield blog_model_1.default.findById(commentData.blogId);
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found!');
    const comment = new comment_model_1.default(commentData);
    yield comment.save();
    return comment;
});
const updateComment = (commentId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findById(commentId);
    if (!comment)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found!');
    Object.assign(comment, updateData);
    yield comment.save();
    return comment;
});
const getCommentsByBlogId = (blogId, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const queryCondition = { blogId };
    const comments = yield comment_model_1.default.find(queryCondition).skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalComments = yield comment_model_1.default.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalComments / limit);
    const page = Math.ceil(skip / limit) + 1;
    return {
        comments,
        meta: {
            limit,
            page,
            totalPages,
            totalItems: totalComments
        }
    };
});
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findByIdAndDelete(commentId);
    if (!comment)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found!');
    return comment;
});
exports.CommentServices = {
    createComment,
    updateComment,
    getCommentsByBlogId,
    deleteComment
};
