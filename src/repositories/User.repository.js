/* eslint-disable no-underscore-dangle */
import AppError from '../errors/AppError';
import { User } from '../models/User.model';

export const createUser = async (body) => {
	try {
		const newUser = new User(body);
		await newUser.save();
		return { nickname: newUser.nickname, id: newUser._id, email: newUser.email };
	} catch (error) {
		throw new AppError({
			message: `${Object.keys(error.keyValue)} already exists`,
			type: 'User-Repo-Create',
			status: 400,
		});
	}
};

export const checkExistingUser = async (nickname) => {
	try {
		const user = await User.findOne({ nickname }, '_id');
		return { id: user._id };
	} catch (e) {
		return null;
	}
};

export const getUser = async (id) => {
	try {
		const user = await User.findById(id, ['nickname', 'email']);
		return { nickname: user.nickname, id: user._id };
	} catch (e) {
		throw new AppError({
			message: 'User not found',
			type: 'User-Repo-Get',
			status: 400,
		});
	}
};
