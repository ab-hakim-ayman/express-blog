import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import CommentControllers from './comment.controllers';
import CommentValidation from './comment.validations';

const router = express.Router();

router.post('/', validateRequest(CommentValidation.createCommentValidation), CommentControllers.createComment);

router.get('/:blogId', CommentControllers.getCommentsByBlogId);

router.put(
	'/:id',
	adminAuth(),
	validateRequest(CommentValidation.updateCommentValidation),
	CommentControllers.updateComment
);

router.delete('/:id', adminAuth(), CommentControllers.deleteComment);

const CommentRoutes = router;

export default CommentRoutes;
