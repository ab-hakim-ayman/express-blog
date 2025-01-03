import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryServices from './Category.services';

const CreateCategory = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryServices.CreateCategory(req.body);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Category created successfully!',
		data: result
	});
});

const GetCategories = catchAsync(async (req: Request, res: Response) => {
	const searchTerm = req.query.search as string;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 20;
	const skip = (page - 1) * limit;

	const { meta, categories } = await CategoryServices.GetCategories(searchTerm, skip, limit);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Categories fetched successfully',
		meta,
		data: categories
	});
});

const GetCategoryById = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryServices.GetCategoryById(req.params.id);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Category fetched successfully',
		data: result
	});
});

const UpdateCategoryById = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryServices.UpdateCategoryById(req.params.id, req.body);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Category updated successfully',
		data: result
	});
});

const DeleteCategoryById = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryServices.DeleteCategoryById(req.params.id);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Category deleted successfully',
		data: result
	});
});

const CategoryControllers = {
	CreateCategory,
	GetCategories,
	GetCategoryById,
	UpdateCategoryById,
	DeleteCategoryById
};

export default CategoryControllers;
