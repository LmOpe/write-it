// import { Post } from '../posts/posts.model';
// import { Comment } from '../comments/comment.model';
import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.email().optional(),
    username: z.string().min(1, 'Username is required'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!*?&])[A-Za-z\d@$!*?&]+$/, 'Password must contain at least one letter, one number and one special character'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const createdUserSchema = createUserSchema.omit({
    password: true,
}).extend({
    id: z.string(),
});

export type CreatedUser = z.infer<typeof createdUserSchema>;

export const loginUserSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
});

export type LoginInput = z.infer<typeof loginUserSchema>;

export const loginResponseSchema = z.object({
    accessToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;