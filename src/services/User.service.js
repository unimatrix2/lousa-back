/* eslint-disable import/prefer-default-export */
import AppError from '../errors/AppError';
import {
	createUser,
	checkExistingUser,
	getUser,
	userTokenInfo,
} from '../repositories/User.repository';
import { authenticate, encrypt, verify } from '../utils/authManager';
import parser from '../mappers/loginBodyMapper';

export const register = async (body) => {
	try {
		const { nickname, email } = body;
		const exists = await checkExistingUser(nickname, email);
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
			user: { nickname: registered.nickname, email: registered.email },
			token: authenticate(registered.id),
		};
	} catch (error) { throw new AppError(error); }
};

export const login = async (body) => {
	try {
		const credentials = parser(body);
		const user = await getUser(credentials);
		if (user) {
			const validation = await verify(body.password, user.password);
			if (validation) {
				return {
					user: { nickname: user.nickname, email: user.email },
					token: authenticate(user.id),
				};
			}
		}
		throw new AppError({
			message: 'Invalid credentials provided',
			type: 'User-Invalid-Credentials',
			status: 401,
		});
	} catch (error) { throw new AppError(error); }
};

export const getNewTokenInfo = async (id) => {
	try {
		const user = await userTokenInfo(id);
		return user;
	} catch (error) { throw new AppError(error); }
};
