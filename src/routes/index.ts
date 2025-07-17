import { Router } from 'express';
import userRoutes from '../modules/users/user.routes';
import postRoutes from '../modules/posts/posts.routes';
import commentRoutes from '../modules/comments/comment.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/posts', postRoutes);
routes.use('/comments', commentRoutes);

export default routes;