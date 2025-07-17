import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateUser";
import { commentInputSchema } from "./comment.schemas";
import { makeCommentHandler, replyCommentHandler } from "./comment.controller";

const commentRoutes = Router()

commentRoutes.post('/posts/:slug', authMiddleware, validateRequest({body: commentInputSchema}), makeCommentHandler);
commentRoutes.post('/:id/reply', authMiddleware, validateRequest({body: commentInputSchema}), replyCommentHandler);

export default commentRoutes;