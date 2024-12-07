import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interfaces';
import Blog from './blog.model';

const createBlog = async (blogData: Partial<TBlog>) => {
	const blog = new Blog({ ...blogData });
	await blog.save();
	return blog;
};

const getBlogById = async (blogId: string) => {
	const blog = await Blog.findById(blogId).populate('category');
	if (!blog) {
		throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
	}
	return blog;
};

const updateBlog = async (blogId: string, updateData: Partial<TBlog>) => {
	const blog = await Blog.findById(blogId);
	if (!blog) {
		throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
	}
	Object.assign(blog, updateData);
	await blog.save();
	return blog;
};

const getBlogs = async (searchQuery: Record<string, unknown>, skip: number, limit: number) => {
	const queryCondition: Record<string, unknown> = {};
	const { category } = searchQuery;

	if (category) {
		queryCondition.category = category;
	}

	const blogs = await Blog.find(queryCondition).skip(skip).limit(limit).populate('category');

	const totalBlogs = await Blog.countDocuments(queryCondition);

	const totalPages = Math.ceil(totalBlogs / limit);
	const page = Math.ceil(skip / limit) + 1;

	return {
		blogs,
		meta: {
			limit,
			page,
			totalPages,
			totalItems: totalBlogs
		}
	};
};

const deleteBlog = async (blogId: string) => {
	const deletedBlog = await Blog.findByIdAndDelete(blogId);

	//! todo: delete all comments related to this blog

	if (!deletedBlog) {
		throw new AppError(httpStatus.NOT_FOUND, 'Blog not found or not authorized!');
	}

	return deletedBlog;
};

export const BlogServices = {
	createBlog,
	updateBlog,
	getBlogs,
	getBlogById,
	deleteBlog
};
