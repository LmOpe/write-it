import { paginatePosts } from '../../lib/utils';
import { createPost, deletePost, getAllPosts, updatePost } from './posts.service';
import { NextFunction, Request, Response } from 'express';


export const createPostHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const postData = req.body;

    try {
        const newPost = await createPost(postData, userId);
        return res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error: any) {
        next(error);
    }
};

export const getAllPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const posts = await getAllPosts();

        const response = await paginatePosts(posts, page, limit);

        return res.status(200).json(response);
    } catch (error: any) {
        next(error);
    }
}

export const updatePostHandler = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const userId = req.user.id;
    const data = req.body;

    try {
        const updatedPost = await updatePost(slug, userId, data);

        res.status(200).json({
            message: 'Post detail updated successfully',
            post: updatedPost
        })

    } catch (error: any) {
        next(error);
    }
}

export const deletePostHandler = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const userId = req.user.id;

    try {
        await deletePost(slug, userId);

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}