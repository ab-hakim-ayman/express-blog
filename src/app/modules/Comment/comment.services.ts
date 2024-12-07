import Comment from "./comment.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TComment } from "./comment.interfaces";

const createComment = async (commentData: Partial<TComment>) => {
  const comment = new Comment(commentData);
  await comment.save();
  return comment;
};

const updateComment = async (commentId: string, updateData: Partial<TComment>) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new AppError(httpStatus.NOT_FOUND, "Comment not found!");

  Object.assign(comment, updateData);
  await comment.save();
  return comment;
};

const getCommentsByBlogId = async (
  blogId: string,
  skip = 0,
  limit = 10
) => {
  const comments = await Comment.find({ blogId })
    .skip(skip)
    .limit(limit);

  const totalComments = await Comment.countDocuments({ blogId });

  const totalPage = Math.ceil(totalComments / limit);
  const page = Math.ceil(skip / limit) + 1;

  return {
    comments,
    meta: {
      limit,
      page,
      totalPage,
      total: totalComments,
    },
  };
};


const deleteComment = async (commentId: string) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) throw new AppError(httpStatus.NOT_FOUND, "Comment not found!");
  return comment;
};

export const CommentServices = {
  createComment,
  updateComment,
  getCommentsByBlogId,
  deleteComment,
};
