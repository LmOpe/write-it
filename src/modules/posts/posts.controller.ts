import { createPost, getAllPosts } from './posts.service';
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

export const getAllPostsHandler = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
        
    try {

        const posts = await getAllPosts();

        const paginatedPosts = posts.slice(startIndex, endIndex);

        return res.status(200).json({
            message: 'Posts fetched successfully',
            posts: paginatedPosts,
            totalPosts: posts.length,
            currentPage: page,
            totalPages: Math.ceil(posts.length / limit)
        });
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}