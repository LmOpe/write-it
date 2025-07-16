import { prisma } from "../../lib/config";
import { CreatePostInput, PostWithoutAuthor, PostArray, UpdatePostInput } from './posts.schemas';
import { createSlug } from '../../lib/utils';
import { ApiError } from '../../lib/errors';

export const createPost = async (post: CreatePostInput, userId: string): Promise<PostWithoutAuthor> => {
    const slug = await createSlug(post.title);
    try {
        const newPost = await prisma.post.create({
            data: {
                ...post,
                slug,
                authorId: userId
            }
        });
        return {
            ...newPost
        };
    } catch (error: any) {
        throw error;
    }
};

export const getAllPosts = async (): Promise<PostArray> => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
        return posts;
    }
    catch (error: any) {
        throw error;
    }
}

export const updatePost = async (postSlug: string, userId: string, data: UpdatePostInput): Promise<PostWithoutAuthor> => {
    const existingPost = await prisma.post.findUnique({
        where:{
            slug: postSlug,
            authorId: userId
        }
    })

    if (!existingPost){
        throw new ApiError('Post not found', 404);
    }
    
    let newSlug: string | undefined;
    
    if (data?.title && data.title !== existingPost.title){
        newSlug = await createSlug(data.title);
    }

    try {
        const updatedPost = prisma.post.update({
            where: {
                slug: postSlug,
                authorId: userId
            },
            data: {
                ...data,
                slug: newSlug || postSlug,
                updatedAt: new Date()
            }
        })

        return updatedPost;
    } catch (error: any) {
        throw error;
    }
}