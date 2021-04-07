import { Router } from 'express';
import { create, pages, retrieve } from '../../services/Post.service';

const router = Router();

router.post('/create', async (req, res) => {
	const { body } = req;
	const { id } = req.user;
	const post = await create({ content: body.content, owner: id });
	res.status(200).json(post);
});

router.get('/count', async (req, res) => {
	try {
		const count = await pages();
		res.status(200).json({ pages: count });
	} catch (error) {
		res.status(error.status).json(error);
	}
});

router.get('/board', async (req, res) => {
	try {
		const posts = await retrieve(null);
		res.status(200).json(posts);
	} catch (error) {
		res.status(error.status).json(error);
	}
});

router.get('/board/:page', async (req, res) => {
	try {
		const { page } = req.params;
		const posts = await retrieve(Number(page));
		res.status(200).json(posts);
	} catch (error) {
		res.status(error.status).json(error);
	}
});

export default router;
