import { ApiError } from "../../lib/errors";
import { prisma } from "../../lib/config";
import { Comment, CommentArray, CommentInput, CreatedComment } from "./comment.schemas";

export const makeComment = async (postSlug: string, userId: string, data: CommentInput): Promise<CreatedComment> => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: postSlug
            }
        })

        if (!post) {
            throw new ApiError('Post not found', 404)
        }

        const newComment = await prisma.comment.create({
            data: {
                content: data.content,
                authorId: userId,
                postId: post.id
            },
            omit: {
                parentCommentId: true
            }
        });

        return newComment;
    } catch (error: any) {
        throw error;
    }
}

export const replyComment = async (commentId: string, userId: string, data: CommentInput): Promise<Comment> => {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            },
            include: {
                post: true
            }
        })

        if (!comment) {
            throw new ApiError('Comment not found', 404)
        }

        const newComment = await prisma.comment.create({
            data: {
                content: data.content,
                authorId: userId,
                postId: comment.postId,
                parentCommentId: comment.id
            }
        })

        return newComment;

    } catch (error) {
        throw error;
    }
}

export const editComment = async (commentId: string, authorId: string, data: CommentInput): Promise<Comment> => {
    try {
        const oldComment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                authorId: authorId
            }
        })

        if (!oldComment) {
            throw new ApiError('Comment not found', 404)
        }
        else if (oldComment.content === data.content) {
            return oldComment;
        }

        const newComment = await prisma.comment.update({
            where: {
                id: commentId,
                authorId: authorId
            },
            data: {
                content: data.content,
                updatedAt: new Date()
            }
        })

        const normalizedComment = {
            ...newComment,
            parentCommentId: newComment.parentCommentId ?? undefined
        }

        return normalizedComment;
    } catch (error) {
        throw error;
    }
}

export const getPostComments = async (postSlug: string): Promise<CommentArray> => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: postSlug
            },
            select: {
                id: true
            }
        })

        if (!post) {
            throw new ApiError("Post with the given slug does not exist!", 404);
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId: post.id
            },
            omit: {
                parentCommentId: true
            }
        })

        return comments;
    } catch (error) {
        throw error;
    }
}