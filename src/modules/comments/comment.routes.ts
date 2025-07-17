import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateUser";
import { commentInputSchema } from "./comment.schemas";
import { makeCommentHandler } from "./comment.controller";

const commentRoutes = Router()

commentRoutes.post('/posts/:slug', authMiddleware, validateRequest({body: commentInputSchema}), makeCommentHandler);

export default commentRoutes;