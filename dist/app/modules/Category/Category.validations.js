"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Category name is required',
            invalid_type_error: 'Category name must be a string'
        })
            .min(3, {
            message: 'Category name must be at least 3 characters long'
        })
            .max(50, {
            message: 'Category name must be at most 50 characters long'
        })
    })
});
exports.default = CategoryValidation;
