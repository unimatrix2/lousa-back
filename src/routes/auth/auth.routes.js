import { Router } from 'express';
import { validateSignup, validateLogin } from '../../middlewares/authValidation';
import { login, register, getNewTokenInfo } from '../../services/User.service';
import { authResponse, authBadResponse, authenticate } from '../../utils/authManager';
import routeProtection from '../../middlewares/routeProtection';
import AppError from '../../errors/AppError';

const router = Router();

router.post('/signup', validateSignup, async (req, res) => {
	try {
		const { body } = req;
		const payload = await register(body);
		authResponse(res, payload);
	} catch (err) {
		authBadResponse(res, err);
	}
});

router.post('/login', validateLogin, async (req, res) => {
	try {
		const { body } = req;
		const payload = await login(body);
		authResponse(res, payload);
	} catch (err) {
		authBadResponse(res, err);
	}
});

router.use(routeProtection);

router.get('/token', async (req, res) => {
	try {
		if (!req.error) {
			const revalidated = authenticate(req.user.id);
			const user = await getNewTokenInfo(req.user.id);
			res.cookie('token', revalidated, {
				maxAge: process.env.COOKIE_EXPIRY,
				httpOnly: true,
				signed: true,
				sameSite: 'strict',
				secure: true,
			}).status(200).json(user);
		} else { throw new AppError(req.error); }
	} catch (err) { res.status(err.status).json(err); }
});

router.get('/logout', (req, res) => {
	res.clearCookie('token');
	res.json({ message: 'User logged out' });
});

export default router;
