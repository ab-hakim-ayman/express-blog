import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const AdminValidation = {
  LoginValidationSchema,
};

export default AdminValidation;