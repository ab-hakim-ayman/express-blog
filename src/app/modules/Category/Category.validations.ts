import { z } from "zod";

const CategoryValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Category name is required",
        invalid_type_error: "Category name must be a string",
      })
      .min(3, {
        message: "Category name must be at least 3 characters long",
      })
      .max(50, {
        message: "Category name must be at most 50 characters long",
      }),
  }),
});


export default CategoryValidation;
