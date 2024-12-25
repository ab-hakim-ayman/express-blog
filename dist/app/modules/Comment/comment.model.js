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
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const commentSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    comment: { type: String, required: true },
    blogId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Blog', required: true } // This links to the Blog model
}, { timestamps: true });
commentSchema.statics.isCommentExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield this.findById(id);
        if (!comment)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
        return comment;
    });
};
const Comment = (0, mongoose_1.model)('Comment', commentSchema);
exports.default = Comment;
