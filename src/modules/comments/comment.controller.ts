import { Request, Response, NextFunction } from "express";
import { deleteComment, editComment, getCommentResponses, getPostComments, makeComment, replyComment } from "./comment.service";
import { paginateComments } from "../../lib/utils";

export const makeCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
    const postSlug = req.params.slug;
    const userId = req.user.id;
    const commentData = req.body;

    try {
        const comment = await makeComment(postSlug, userId, commentData);

        return res.status(201).json({
            message: 'Comment added successfully.',
            comment: comment
        })
    } catch (error: any) {
        next(error);
    }
}

export const replyCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;
    const userId = req.user.id;
    const commentData = req.body;

    try {
        const comment = await replyComment(commentId, userId, commentData);

        return res.status(201).json({
            message: 'Comment Responded to successfully.',
            comment: comment
        })
    } catch (error: any) {
        next(error);
    }
}

export const editCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;
    const authorId = req.user.id;
    const commentData = req.body;

    try {
        const comment = await editComment(commentId, authorId, commentData);

        return res.status(200).json({
            message: 'Comment edited successfully.',
            comment: comment
        })
    } catch (error: any) {
        next(error);
    }
}

export const getPostCommentsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const postSlug = req.params.slug;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const comments = await getPostComments(postSlug);

        const paginatedComments = await paginateComments(comments, page, limit)

        res.status(200).json(paginatedComments)
    } catch (error: any) {
        next(error);
    }
}

export const getCommentResponsesHandler = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const responses = await getCommentResponses(commentId);

        const paginatedResponses = await paginateComments(responses, page, limit);

        res.status(200).json(paginatedResponses);
    } catch (error: any) {
        next(error);
    }
}

export const deleteCommenttHandler = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;
    const userId = req.user.id;

    try {
        await deleteComment(commentId, userId);

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}