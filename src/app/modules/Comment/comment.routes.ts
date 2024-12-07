import express from "express";

import adminAuth from "../../middlewares/adminAuth";
import validateRequest from "../../middlewares/validateRequest";
import CommentControllers from "./comment.controllers";
import CommentValidation from "./comment.validations";

const router = express.Router();

router.post(
  "/",
  adminAuth(),
  validateRequest(CommentValidation.createCommentValidation),
  CommentControllers.createComment,
);


router.get(
  "/:id",
  adminAuth(), 
  CommentControllers.getCommentsByBlogId,
);

router.put(
  "/:id",
  adminAuth("admin"),
  validateRequest(CommentValidation.updateCommentValidation),
  CommentControllers.updateComment,
);

router.delete(
  "/:id",
  adminAuth("admin"),
  CommentControllers.deleteComment,
);

const CommentRoutes = router;

export default CommentRoutes;
