import { Router } from 'express';
import userRoutes from '../modules/users/user.routes';
import postRoutes from '../modules/posts/posts.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/posts', postRoutes);

export default routes;