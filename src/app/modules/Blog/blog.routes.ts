import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controllers";
import BlogValidations from "./blog.validations";
import adminAuth from "../../middlewares/adminAuth";

const router = express.Router();

router.post(
  "/create",
  validateRequest(BlogValidations.createBlogValidation),
  BlogControllers.createBlog
);

router.get("/", BlogControllers.getBlogs);

router.get("/:id", BlogControllers.getBlog);

router.put(
  "/:id", 
  adminAuth("admin"),
  validateRequest(BlogValidations.updateBlogValidation),
  BlogControllers.updateBlog
);

router.delete("/:id", adminAuth("admin"), BlogControllers.deleteBlog);

const BlogRoutes = router;

export default BlogRoutes;
