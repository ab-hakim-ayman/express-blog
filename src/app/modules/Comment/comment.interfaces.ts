/* eslint-disable no-unused-vars */
import { Document, Model, Types } from 'mongoose';

export interface TComment extends Document {
	name: string;
	comment: string;
	blogId: Types.ObjectId | string;
}

export interface CommentModel extends Model<TComment> {
	isCommentExists(id: string): Promise<TComment>;
}
