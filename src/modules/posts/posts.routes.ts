import { Router } from 'express';
import { createPostHandler, deletePostHandler, getAllPostsHandler, updatePostHandler } from './posts.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateRequest } from '../../middlewares/validateUser';
import { postInputSchema, postPaginationQuerySchema, updatePostSchema } from './posts.schemas';

const postRoutes = Router();

postRoutes.post('/', authMiddleware, validateRequest({ body: postInputSchema }), createPostHandler);
postRoutes.get('/', authMiddleware, validateRequest({ query: postPaginationQuerySchema }), getAllPostsHandler);
postRoutes.patch('/:slug', authMiddleware, validateRequest({ body: updatePostSchema }), updatePostHandler);
postRoutes.delete('/:slug', authMiddleware, deletePostHandler);

export default postRoutes;