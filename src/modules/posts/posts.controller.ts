import { createPost } from './posts.service';
import {Request, Response} from 'express';


export const createPostHandler = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const postData = req.body;

    try {
        const newPost = await createPost(postData, userId);
        return res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
};