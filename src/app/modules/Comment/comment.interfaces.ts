/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TComment {
  _id?: Types.ObjectId;
  name: string;
  comment: string;
  blogId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentModel extends Model<TComment> {
  isCommentExists(id: string | Types.ObjectId): Promise<TComment | null>;
}
