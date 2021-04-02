import { Router } from 'express';
import routeProtection from '../middlewares/routeProtection';
import authRoutes from './auth/auth.routes';
import userRoutes from './user/user.routes';
import postRoutes from './post/post.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use(routeProtection);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

export default router;
