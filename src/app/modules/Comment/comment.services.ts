import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Blog from '../Blog/blog.model';
import { TComment } from './comment.interfaces';
import Comment from './comment.model';

const createComment = async (commentData: Partial<TComment>) => {
	// check if the blog exists
	const blog = await Blog.findById(commentData.blogId);
	if (!blog) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');

	const comment = new Comment(commentData);
	await comment.save();
	return comment;
};

const updateComment = async (commentId: string, updateData: Partial<TComment>) => {
	const comment = await Comment.findById(commentId);
	if (!comment) throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');

	Object.assign(comment, updateData);
	await comment.save();
	return comment;
};

const getCommentsByBlogId = async (blogId: string, skip: number, limit: number) => {
	const queryCondition: Record<string, unknown> = { blogId };

	const comments = await Comment.find(queryCondition).skip(skip).limit(limit).sort({ createdAt: -1 });

	const totalComments = await Comment.countDocuments(queryCondition);

	const totalPages = Math.ceil(totalComments / limit);
	const page = Math.ceil(skip / limit) + 1;

	return {
		comments,
		meta: {
			limit,
			page,
			totalPages,
			totalItems: totalComments
		}
	};
};

const deleteComment = async (commentId: string) => {
	const comment = await Comment.findByIdAndDelete(commentId);
	if (!comment) throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');
	return comment;
};

export const CommentServices = {
	createComment,
	updateComment,
	getCommentsByBlogId,
	deleteComment
};
