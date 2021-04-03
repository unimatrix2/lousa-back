import AppError from '../errors/AppError';
import { validate } from '../utils/authManager';

const routeProtection = (req, res, nxt) => {
	const { token } = req.signedCookies;
	if (!token) {
		req.error = new AppError({
			message: 'No token provided',
			type: 'Auth-No-Token',
			status: 401,
		});
		return nxt();
	}
	try {
		const decoded = validate(token);
		req.user = { id: decoded.id };
		return nxt();
	} catch (error) {
		req.error = new AppError({
			message: 'Expired or non-existent token',
			type: 'Auth-Invalid-Token',
			status: 401,
		});
		return nxt();
	}
};

export default routeProtection;
