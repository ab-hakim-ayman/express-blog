"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const LoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required'
        })
            .email({
            message: 'Invalid email'
        }),
        password: zod_1.z.string({
            required_error: 'Password is required'
        })
    })
});
const AdminValidation = {
    LoginValidationSchema
};
exports.default = AdminValidation;
