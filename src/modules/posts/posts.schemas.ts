import { createdUserSchema } from '../users/user.schemas';

import { z } from 'zod';

export const postInputSchema = z.object({
    title: z.string().min(1, "Post title is required"),
    content: z.string().min(1, "Post content is required"),
    published: z.boolean()
})
export type CreatePostInput = z.infer<typeof postInputSchema>;

export const postDataSchema = postInputSchema.extend({
    id: z.string(),
    slug: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    author: createdUserSchema
});
export type PostData = z.infer<typeof postDataSchema>;

export const postWithoutAuthorSchema = postDataSchema.omit({ author: true });
export type PostWithoutAuthor = z.infer<typeof postWithoutAuthorSchema>;

export const postArraySchema = z.array(postDataSchema);
export type PostArray = z.infer<typeof postArraySchema>;

export const userPostSchemaArray = z.array(postWithoutAuthorSchema);
export type UserPostArray = z.infer<typeof userPostSchemaArray>;

export const postPaginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10)
});

export const updatePostSchema = postInputSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        error: 'At least one field must be provided for update',
    }
)
export type UpdatePostInput = z.infer<typeof updatePostSchema>;