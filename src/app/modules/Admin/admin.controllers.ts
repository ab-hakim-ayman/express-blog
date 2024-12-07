import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AdminServices from './admin.services';

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
	const result = await AdminServices.loginAdmin(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'The admin logged in successfully',
		data: {
			accessToken: result
		}
	});
});

const AdminControllers = {
	loginAdmin
};

export default AdminControllers;
