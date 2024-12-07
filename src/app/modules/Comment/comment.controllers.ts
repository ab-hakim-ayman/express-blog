import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CommentServices } from "./comment.services";

const createComment: RequestHandler = catchAsync(async (req, res) => {
  const commentData = req.body;
  const result = await CommentServices.createComment(commentData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment created successfully!",
    data: result,
  });
});

const updateComment: RequestHandler = catchAsync(async (req, res) => {
  const commentId = req.params.id;
  const updateData = req.body;

  const result = await CommentServices.updateComment(commentId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully!",
    data: result,
  });
});

const getCommentsByBlogId: RequestHandler = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const { comments, totalComments } = await CommentServices.getCommentsByBlogId(
    blogId,
    skip,
    limit,
  );

  const totalPages = Math.ceil(totalComments / limit);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments retrieved successfully!",
    data: {
      comments,
      pagination: {
        totalComments,
        totalPages,
        currentPage: page,
        limit,
      },
    },
  });
});

const deleteComment: RequestHandler = catchAsync(async (req, res) => {
  const commentId = req.params.id;

  const result = await CommentServices.deleteComment(commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully!",
    data: result,
  });
});

const CommentControllers = {
  createComment,
  updateComment,
  getCommentsByBlogId,
  deleteComment,
};

export default CommentControllers;