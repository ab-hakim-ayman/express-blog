import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.services';

const createBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const blogData = req.body;

	const result = await BlogServices.createBlog(blogData);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Blog created successfully!',
		data: result
	});
});

const updateBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const blogId = req.params.id;
	const updateData = req.body;
	const updatedBlog = await BlogServices.updateBlog(blogId, updateData);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog updated successfully!',
		data: updatedBlog
	});
});

const getBlogs: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const searchQuery = req.query;

	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;
	const skip = (page - 1) * limit;

	const { blogs, meta } = await BlogServices.getBlogs(searchQuery, skip, limit);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blogs retrieved successfully!',
		meta,
		data: blogs
	});
});

const getBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const blogId = req.params.id;

	const result = await BlogServices.getBlogById(blogId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog retrieved successfully!',
		data: result
	});
});

const getBlogBySlug: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const slug = req.params.slug;

	const result = await BlogServices.getBlogBySlug(slug);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog retrieved successfully!',
		data: result
	});
});

const deleteBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const blogId = req.params.id;

	const result = await BlogServices.deleteBlog(blogId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog deleted successfully!',
		data: result
	});
});

export const BlogControllers = {
	createBlog,
	updateBlog,
	getBlogs,
	getBlog,
	getBlogBySlug,
	deleteBlog
};
