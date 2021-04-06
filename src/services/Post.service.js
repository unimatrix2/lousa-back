import AppError from '../errors/AppError';
import { createPost, countPosts, getPosts } from '../repositories/Post.repository';

export const create = async (body) => {
	try {
		const newPost = await createPost(body);
		return newPost;
	} catch (error) { throw new AppError(error); }
};

export const pages = async () => {
	try {
		const count = await countPosts();
		return count;
	} catch (error) { throw new AppError(error); }
};

export const retrieve = async (start) => {
	try {
		const posts = await getPosts(start);
		return posts;
	} catch (error) { throw new AppError(error); }
};
