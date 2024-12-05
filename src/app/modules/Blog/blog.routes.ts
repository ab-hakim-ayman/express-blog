import express from "express";
import adminAuth from "../../middlewares/adminAuth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controllers";
import BlogValidations from "./blog.validations";

const router = express.Router();

router.post(
  "/create",
  adminAuth("admin"),
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
