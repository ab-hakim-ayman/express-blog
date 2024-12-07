import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/jwtHelpers';
import { Admin } from './admin.model';

const loginAdmin = async (payload: { email: string; password: string }) => {
	const { email, password } = payload;

	// check if the user is exist
	const admin = await Admin.findOne({ email }).select('+password');
	if (!admin) {
		throw new AppError(httpStatus.NOT_FOUND, 'The admin is not found');
	}

	// check if the password is correct
	const isPasswordMatch = await Admin.isPasswordMatched(password, admin?.password);

	if (!isPasswordMatch) {
		throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
	}

	const jwtPayload = {
		id: admin?._id.toString(),
		email: admin?.email,
		role: 'admin'
	};

	const accessToken = createToken(jwtPayload, config.jwt_secret, config.jwt_expiration);

	return accessToken;
};

const AdminServices = {
	loginAdmin
};

export default AdminServices;
