"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createCommentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required!'
        })
            .min(2, {
            message: 'Name must be at least 2 characters long!'
        }),
        comment: zod_1.z
            .string({
            required_error: 'Comment is required!'
        })
            .min(5, {
            message: 'Comment must be at least 5 characters long!'
        }),
        blogId: zod_1.z
            .string({
            required_error: 'Blog ID is required!'
        })
            .regex(/^[a-f\d]{24}$/i, { message: 'Invalid ObjectId format for blogId!' })
    })
});
const updateCommentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, {
            message: 'Name must be at least 2 characters long!'
        })
            .optional(),
        comment: zod_1.z
            .string()
            .min(5, {
            message: 'Comment must be at least 5 characters long!'
        })
            .optional(),
        blogId: zod_1.z
            .string()
            .regex(/^[a-f\d]{24}$/i, { message: 'Invalid ObjectId format for blogId!' })
            .optional()
    })
});
const CommentValidations = {
    createCommentValidation,
    updateCommentValidation
};
exports.default = CommentValidations;
