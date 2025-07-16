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

export const userDataSchema = createdUserSchema.extend({
    createdAt: z.date(),
    updatedAt: z.date()
})
export type UserData = z.infer<typeof userDataSchema>;

export const allUsersSchema = z.array(userDataSchema);
export type AllUsers = z.infer<typeof allUsersSchema>;

export const editUserSchema = z.object({
    email: z.email().optional(),
    username: z.string().min(1, 'Username cannot be empty').optional(),
}).refine((data) => data.email || data.username, {
    error: 'At least one field (email or username) must be provided',
});
export type EditUser = z.infer<typeof editUserSchema>;