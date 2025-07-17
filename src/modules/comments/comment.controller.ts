import { Request, Response } from "express";
import { NextFunction } from "express";
import { makeComment } from "./comment.service";

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