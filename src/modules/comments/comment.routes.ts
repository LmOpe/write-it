import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateUser";
import { commentInputSchema } from "./comment.schemas";
import { deleteCommenttHandler, editCommentHandler, getCommentResponsesHandler, replyCommentHandler } from "./comment.controller";

const commentRoutes = Router()

commentRoutes.post('/:id/reply', authMiddleware, validateRequest({body: commentInputSchema}), replyCommentHandler);
commentRoutes.patch('/:id', authMiddleware, validateRequest({body: commentInputSchema}), editCommentHandler);
commentRoutes.get('/:id/responses', authMiddleware, getCommentResponsesHandler);
commentRoutes.delete('/:id', authMiddleware, deleteCommenttHandler);

export default commentRoutes;