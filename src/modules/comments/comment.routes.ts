import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateUser";
import { commentInputSchema } from "./comment.schemas";
import { editCommentHandler, makeCommentHandler, replyCommentHandler } from "./comment.controller";

const commentRoutes = Router()

commentRoutes.post('/posts/:slug', authMiddleware, validateRequest({body: commentInputSchema}), makeCommentHandler);
commentRoutes.post('/:id/reply', authMiddleware, validateRequest({body: commentInputSchema}), replyCommentHandler);
commentRoutes.patch('/:id', authMiddleware, validateRequest({body: commentInputSchema}), editCommentHandler);

export default commentRoutes;