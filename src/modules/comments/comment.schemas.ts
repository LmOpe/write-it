import { createdUserSchema } from '../users/user.schemas';
import { z } from 'zod';

export const commentInputSchema = z.object({
    content: z.string().min(1, 'Comment content is require')
})
export type CommentInput = z.infer<typeof commentInputSchema>;

export const createdCommentSchema = commentInputSchema.extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
export type CreatedComment = z.infer<typeof createdCommentSchema>;

export const commentSchema: z.ZodType<any> = z.lazy(() =>
    createdCommentSchema.extend({
        parentCommentId: z.string().optional(),
        author: createdUserSchema,
        replies: z.array(commentSchema).optional()
    })
)
export type Comment = z.infer<typeof commentSchema>;

export const commentArraySchema = z.array(commentSchema);
export type CommentArray = z.infer<typeof commentArraySchema>;