import { Schema, model } from 'mongoose';
import { TComment, CommentModel } from './comment.interfaces';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const commentSchema = new Schema<TComment>(
	{
		name: { type: String, required: true, trim: true },
		comment: { type: String, required: true },
		blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
	},
	{ timestamps: true }
);

commentSchema.statics.isCommentExists = async function (id: string) {
	const comment = await this.findById(id);
	if (!comment) throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
	return comment;
};

const Comment = model<TComment, CommentModel>('Comment', commentSchema);

export default Comment;
