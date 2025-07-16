import { paginatePosts } from '../../lib/utils';
import { createPost, getAllPosts } from './posts.service';
import { Request, Response } from 'express';


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

export const getAllPostsHandler = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const posts = await getAllPosts();

        const response = await paginatePosts(posts, page, limit);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}