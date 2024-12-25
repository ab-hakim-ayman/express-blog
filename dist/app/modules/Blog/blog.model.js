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
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const generateSlug_1 = __importDefault(require("../../utils/generateSlug"));
const imageSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true }
}, { _id: false });
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, unique: true },
    metaDescription: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: imageSchema,
    isArchived: { type: Boolean, default: false }
}, { timestamps: true });
blogSchema.statics.isBlogExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const blog = yield this.findById(id);
        if (!blog)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
        return blog;
    });
};
blogSchema.statics.findBlogByTitle = function (title) {
    return __awaiter(this, void 0, void 0, function* () {
        const blog = yield this.findOne({ title });
        if (!blog)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog with this title not found');
        return blog;
    });
};
blogSchema.pre('save', function (next) {
    this.slug = (0, generateSlug_1.default)(this.title);
    next();
});
blogSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update.title) {
            update.slug = (0, generateSlug_1.default)(update.title);
            this.setUpdate(update);
        }
        next();
    });
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
