import { z } from "zod";

const createCommentValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required!",
      })
      .min(2, {
        message: "Name must be at least 2 characters long!",
      }),
    comment: z
      .string({
        required_error: "Comment is required!",
      })
      .min(5, {
        message: "Comment must be at least 5 characters long!",
      }),
    blogId: z
      .string({
        required_error: "Blog ID is required!",
      })
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId format for blogId!" }),
  }),
});

const updateCommentValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long!",
      })
      .optional(),
    comment: z
      .string()
      .min(5, {
        message: "Comment must be at least 5 characters long!",
      })
      .optional(),
    blogId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId format for blogId!" })
      .optional(),
  }),
});

const CommentValidations = {
  createCommentValidation,
  updateCommentValidation,
};

export default CommentValidations;
