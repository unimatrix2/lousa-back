/* eslint-disable import/prefer-default-export */
import AppError from '../errors/AppError';
import { createUser, checkExistingUser } from '../repositories/User.repository';
import { authenticate, encrypt } from '../utils/authManager';

export const register = async (body) => {
	try {
		const { nickname, email } = body;
		const exists = await checkExistingUser(nickname);
		if (exists?.id) {
			throw new AppError({
				message: 'User already registered',
				type: 'User-Exists',
				status: '400',
			});
		}
		const registered = await createUser({
			nickname,
			email,
			password: await encrypt(body.password),
		});
		return {
			user: {
				nickname: registered.nickname,
				email: registered.email,
			},
			token: authenticate(registered.id),
		};
	} catch (error) {
		throw new AppError(error);
	}
};
