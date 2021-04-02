import { Router } from 'express';
import { validateSignup, validateLogin } from '../../middlewares/authValidation';
import { login, register } from '../../services/User.service';
import { authResponse, authBadResponse } from '../../utils/authManager';

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

export default router;
