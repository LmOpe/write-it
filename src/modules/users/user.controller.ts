import { Request, Response } from 'express';
import { createUser, authenticate, logout, getUserPosts } from '../users/user.service';
import { generateToken, paginatePosts } from '../../lib/utils';
import { createdUserSchema, CreatedUser } from './user.schemas';

export const registerUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const data = await createUser({ email, username, password });
        const tokenPayload: {
            id: string;
            username: string;
            email?: string;
        } = {
            id: data.id,
            username: data.username,
        };

        if (data.email) {
            tokenPayload.email = data.email;
        }

        const token = await generateToken(tokenPayload);

        res.status(201).json({
            message: 'User created successfully',
            user: data,
            accessToken: token
        });
    } catch (error: any) {
        if (error.message !== null) {
            return res.status(409).json({ message: error.message });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const accessToken = await authenticate({ username, password })
        res.status(200).json({
            "message": "User login successful",
            accessToken: accessToken
        })
    } catch (error: any) {
        res.status(401).json({ message: error.message })
    }
}

export const getUserDetails = async (req: Request, res: Response) => {
    const user: CreatedUser = createdUserSchema.parse(req.user);
    res.status(200).json({
        message: "User details retrieved successfully",
        user: user
    });
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        await logout(req.token);
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error: any) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Failed to logout user' });
    }
}

export const getUserPostsHandler = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const posts = await getUserPosts(userId);

        const response = await paginatePosts(posts, page, limit);

        res.status(200).json(response);
    } catch (error: any) {
        console.error('Error retrieving user posts:', error);
        res.status(500).json({ message: 'Failed to retrieve user posts' });
    }
}