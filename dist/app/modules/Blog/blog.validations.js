"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required!'
        })
            .min(3, {
            message: 'Title must be at least 3 characters long!'
        }),
        metaDescription: zod_1.z
            .string({
            required_error: 'Meta description is required!'
        })
            .min(10, {
            message: 'Meta description must be at least 10 characters long!'
        })
            .max(160, {
            message: 'Meta description must be at most 160 characters long!'
        }),
        content: zod_1.z
            .string({
            required_error: 'Content is required!'
        })
            .min(20, {
            message: 'Content must be at least 20 characters long!'
        }),
        category: zod_1.z
            .string({
            required_error: 'Category is required!'
        })
            .regex(/^[a-f\d]{24}$/i, { message: 'Invalid ObjectId format for category!' }),
        image: zod_1.z.object({
            publicId: zod_1.z.string({
                required_error: 'Image publicId is required!'
            }),
            url: zod_1.z
                .string({
                required_error: 'Image URL is required!'
            })
                .url({
                message: 'Invalid URL format!'
            })
        })
    })
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(3, {
            message: 'Title must be at least 3 characters long!'
        })
            .optional(),
        metaDescription: zod_1.z
            .string()
            .min(10, {
            message: 'Meta description must be at least 10 characters long!'
        })
            .optional(),
        content: zod_1.z
            .string()
            .min(20, {
            message: 'Content must be at least 20 characters long!'
        })
            .optional(),
        category: zod_1.z
            .string()
            .regex(/^[a-f\d]{24}$/i, { message: 'Invalid ObjectId format for category!' })
            .optional(),
        image: zod_1.z
            .object({
            publicId: zod_1.z.string().optional(),
            url: zod_1.z.string().url().optional()
        })
            .optional(),
        isArchived: zod_1.z.boolean().optional()
    })
});
const BlogValidations = {
    createBlogValidation,
    updateBlogValidation
};
exports.default = BlogValidations;
