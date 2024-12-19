import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { SystemServices } from './system.services';

const getDashboardStates: RequestHandler = catchAsync(async (_req: Request, res: Response) => {
	const states = await SystemServices.DashboardStates();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Dashboard states retrieved successfully!',
		data: states
	});
});

const SystemControllers = {
	getDashboardStates
};

export default SystemControllers;
