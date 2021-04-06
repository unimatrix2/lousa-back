import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import postRoutes from './post/post.routes';
import routeProtection from '../middlewares/routeProtection';

const router = Router();

router.use('/auth', authRoutes);
router.use(routeProtection);
router.use('/post', postRoutes);

export default router;
