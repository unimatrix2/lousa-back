import { Router } from 'express';
import { validateSignup, validateLogin } from '../../middlewares/authValidation';
import { register } from '../../services/User.service';

const router = Router();

router.post('/signup', validateSignup, async (req, res) => {
	try {
		const { body } = req;
		const payload = await register(body);
		res.cookie('token', payload.token, {
			maxAge: process.env.COOKIE_EXPIRY,
			httpOnly: true,
			signed: true,
			sameSite: 'strict',
			secure: true,
		});
		res.json(payload.user).status(200);
	} catch (error) {
		res.json({
			message: 'An error has occured, please try again later',
			error,
		}).status(error.status);
	}
});

export default router;
