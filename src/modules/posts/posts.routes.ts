import { Router }  from 'express';
import { createPostHandler } from './posts.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateRequest } from '../../middlewares/validateUser';
import { postInputSchema } from './posts.schemas';

const postRoutes = Router();

postRoutes.post('/', authMiddleware, validateRequest(postInputSchema), createPostHandler);

export default postRoutes;