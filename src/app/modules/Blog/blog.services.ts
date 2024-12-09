import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Comment from '../Comment/comment.model';
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

const getBlogBySlug = async (slug: string) => {
	const blog = await Blog.findOne({ slug }).populate('category');
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
	const session = await Blog.startSession();

	try {
		// Start transaction
		session.startTransaction();

		// Find the blog with the session
		const blog = await Blog.findById(blogId).session(session);

		if (!blog) {
			throw new AppError(httpStatus.NOT_FOUND, 'Blog not found or not authorized!');
		}

		// Delete related comments with the session
		await Comment.deleteMany({ blogId }).session(session);

		// Delete the blog itself
		await Blog.findByIdAndDelete(blogId).session(session);

		// Commit transaction
		await session.commitTransaction();
		session.endSession();

		return blog;
	} catch (error: any) {
		// Rollback transaction on error
		await session.abortTransaction();
		session.endSession();

		// Re-throw error
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'An error occurred while deleting the blog!');
	}
};

export const BlogServices = {
	createBlog,
	updateBlog,
	getBlogs,
	getBlogById,
	getBlogBySlug,
	deleteBlog
};
