/* eslint-disable consistent-return */
import AppError from '../errors/AppError';
import { validate } from '../utils/authManager';

const routeProtection = (req, res, nxt) => {
	try {
		const { token } = req.signedCookies;
		if (!token) {
			throw new AppError({
				message: 'No token provided',
				type: 'Auth-No-Token',
				status: 401,
			});
		}
		const decoded = validate(token);
		req.user = { id: decoded.id };
		return nxt();
	} catch (error) {
		res
			.clearCookie('token')
			.status(error.status)
			.json(new AppError(error));
	}
};

export default routeProtection;
