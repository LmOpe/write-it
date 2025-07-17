import { ApiError } from "../../lib/errors";
import { prisma } from "../../lib/config";
import { Comment, CommentInput, CreatedComment } from "./comment.schemas";

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
            }
        });

        const normalizedComment = {
            ...newComment,
            parentCommentId: newComment.parentCommentId ?? undefined
        }

        return normalizedComment;
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