import { Router }  from 'express';
import { createPostHandler, getAllPostsHandler } from './posts.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateRequest } from '../../middlewares/validateUser';
import { postInputSchema, postPaginationQuerySchema } from './posts.schemas';

const postRoutes = Router();

postRoutes.post('/', authMiddleware, validateRequest({body: postInputSchema}), createPostHandler);
postRoutes.get('/', authMiddleware, validateRequest({query: postPaginationQuerySchema}), getAllPostsHandler);

export default postRoutes;