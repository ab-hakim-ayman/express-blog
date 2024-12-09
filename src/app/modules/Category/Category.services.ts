import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Blog from '../Blog/blog.model';
import Comment from '../Comment/comment.model';
import Category from './Category.model';
import { TCategory } from './Category.types';

const CreateCategory = async (data: TCategory) => {
	const category = await Category.create(data);
	return category;
};

const GetCategories = async (searchTerm: string, skip: number, limit: number) => {
	const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};
	const categories = await Category.find(query).skip(skip).limit(limit);

	const totalCategories = await Category.countDocuments(query);

	const totalPages = Math.ceil(totalCategories / limit);
	const page = Math.ceil(skip / limit) + 1;
	const meta = {
		limit,
		page,
		totalPages,
		totalItems: totalCategories
	};

	return { meta, categories };
};

const GetCategoryById = async (id: string) => {
	const category = await Category.findById(id);
	if (!category) {
		throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
	}
	return category;
};

const UpdateCategoryById = async (id: string, data: Partial<TCategory>) => {
	const category = await Category.findByIdAndUpdate(id, data, { new: true });
	if (!category) {
		throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
	}
	return category;
};

const DeleteCategoryById = async (categoryId: string) => {
	// Ensure the category exists before attempting deletion
	await GetCategoryById(categoryId);

	const session = await Category.startSession();

	try {
		session.startTransaction();

		// Find blogs related to the category
		const blogs = await Blog.find({ category: categoryId }).session(session);
		const blogIds = blogs.map((blog) => blog._id); // Extract blog IDs

		// Delete blogs related to the category
		await Blog.deleteMany({ category: categoryId }).session(session);

		// Delete comments related to the blogs
		if (blogIds.length > 0) {
			await Comment.deleteMany({ blogId: { $in: blogIds } }).session(session);
		}

		// Finally, delete the category
		const category = await Category.findByIdAndDelete(categoryId).session(session);

		// Commit the transaction
		await session.commitTransaction();
		session.endSession();

		return category;
	} catch (error: any) {
		// Roll back the transaction
		await session.abortTransaction();
		session.endSession();

		throw new AppError(
			httpStatus.INTERNAL_SERVER_ERROR,
			error.message ?? 'An error occurred while deleting the category'
		);
	}
};

export default {
	CreateCategory,
	GetCategories,
	GetCategoryById,
	UpdateCategoryById,
	DeleteCategoryById
};
