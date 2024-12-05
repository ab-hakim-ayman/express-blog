import { z } from "zod";

const createBlogValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required!",
      })
      .min(3, {
        message: "Title must be at least 3 characters long!",
      }),
    metaDescription: z
      .string({
        required_error: "Meta description is required!",
      })
      .min(10, {
        message: "Meta description must be at least 10 characters long!",
      }),
    content: z
      .string({
        required_error: "Content is required!",
      })
      .min(20, {
        message: "Content must be at least 20 characters long!",
      }),
    category: z
      .string({
        required_error: "Category is required!",
      })
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId format for category!" }),
    image: z.object({
      publicId: z.string({
        required_error: "Image publicId is required!",
      }),
      url: z
        .string({
          required_error: "Image URL is required!",
        })
        .url({
          message: "Invalid URL format!",
        }),
    }),
    isArchived: z.boolean().optional(),
  }),
});

const updateBlogValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, {
        message: "Title must be at least 3 characters long!",
      })
      .optional(),
    metaDescription: z
      .string()
      .min(10, {
        message: "Meta description must be at least 10 characters long!",
      })
      .optional(),
    content: z
      .string()
      .min(20, {
        message: "Content must be at least 20 characters long!",
      })
      .optional(),
    category: z
      .string()
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId format for category!" })
      .optional(),
    image: z
      .object({
        publicId: z.string().optional(),
        url: z.string().url().optional(),
      })
      .optional(),
    isArchived: z.boolean().optional(),
  }),
});

const BlogValidations = {
  createBlogValidation,
  updateBlogValidation,
};

export default BlogValidations;
