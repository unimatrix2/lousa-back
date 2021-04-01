import { signupSchema, loginSchema } from '../models/User.model';
import AppError from '../errors/AppError';

export const validateSignup = (req, res, nxt) => {
	const validation = signupSchema.validate(req.body);
	if (validation.error) {
		const error = validation.error.details.reduce((acc, err) => {
			acc[err.context.label] = err.message;
			return acc;
		}, {});
		throw new AppError({
			message: error,
			type: 'Signup-Validate-Error',
			status: 400,
		});
	}
	return nxt();
};

export const validateLogin = (req, res, nxt) => {
	const validation = loginSchema.validate(req.body);
	if (validation.error) {
		const error = validation.error.details.reduce((acc, err) => {
			acc[err.context.label] = err.message;
			return acc;
		}, {});
		throw new AppError({
			message: error,
			type: 'Login-Validate-Error',
			status: 401,
		});
	}
	return nxt();
};
