import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

export const encrypt = async (password) => {
	const pwd = await hash(password, 10);
	return pwd;
};

export const verify = async (password, hashed) => {
	try {
		const validated = await compare(password, hashed);
		return validated;
	} catch (error) {
		return false;
	}
};

export const authenticate = (id) => {
	if (id) {
		const token = jwt.sign(
			{ id },
			process.env.TOKEN_SECRET,
			{ expiresIn: process.env.TOKEN_EXPIRATION },
		);
		return token;
	}
	throw new AppError({
		message: 'No user provided',
		type: 'Auth-No-User',
		status: 400,
	});
};

export const validate = (token) => {
	try {
		const validated = jwt.verify(token, process.env.TOKEN_SECRET);
		return validated;
	} catch (error) {
		throw new AppError({
			message: 'Expired or Invalid Token',
			type: 'Auth-Invalid-Token',
			status: 401,
		});
	}
};

export const authResponse = (res, payload) => {
	res.cookie('token', payload.token, {
		maxAge: process.env.COOKIE_EXPIRY,
		httpOnly: true,
		signed: true,
		sameSite: 'strict',
		secure: true,
	});
	res.status(200).json(payload.user);
};

export const authBadResponse = (res, err) => {
	res.status(err.status).json(err);
};
