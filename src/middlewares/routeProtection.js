import AppError from '../errors/AppError';
import { validate } from '../utils/authManager';

export default function routeProtection(req, res, nxt) {
	const { token } = req.signedCookies;
	if (!token) {
		throw new AppError({
			message: 'No credentials provided',
			type: 'Auth-No-Token',
			status: 401,
		});
	}
	try {
		const decoded = validate(token);
		req.user = { id: decoded.id };
	} catch (error) { return nxt(new AppError(error)); }
	return nxt();
}
