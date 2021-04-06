/* eslint-disable comma-dangle */
import Post from '../models/Post.model';
import countMapper from '../mappers/postCountMapper';
import AppError from '../errors/AppError';

export const createPost = async (body) => {
	try {
		const newPost = new Post(body);
		await newPost.save();
		await Post.populate(newPost, { path: 'owner', select: 'nickname' });
		return { owner: newPost.owner.nickname, content: newPost.content };
	} catch (error) {
		throw new AppError({
			message: 'Could not create post',
			type: 'Post-Create',
			status: 400,
		});
	}
};

export const countPosts = async () => {
	try {
		const count = await Post.countDocuments();
		return countMapper(count);
	} catch (error) {
		throw new AppError({
			message: 'Could not count the posts',
			type: 'Post-Count',
			status: 400,
		});
	}
};

export const getPosts = async (start) => {
	try {
		const posts = await Post.find(
			{},
			['content', 'owner'],
			{ sort: { createdAt: -1 }, skip: start, limit: 10 }
		).populate({ path: 'owner', select: 'nickname' });
		return posts;
	} catch (error) {
		throw new AppError({
			message: 'Could not retrieve posts',
			type: 'Posts-Get',
			status: 500,
		});
	}
};
