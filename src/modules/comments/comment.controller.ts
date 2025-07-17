import { Request, Response } from "express";
import { NextFunction } from "express";
import { editComment, makeComment, replyComment } from "./comment.service";

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
    } catch (error) {
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
    } catch (error) {
        next(error);
    }
}