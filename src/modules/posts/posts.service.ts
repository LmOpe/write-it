import { prisma } from "../../lib/config";
import { CreatePostInput, PostWithoutAuthor, PostArray } from './posts.schemas';
import { createSlug } from '../../lib/utils';

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
    } catch (error) {
        throw new Error(`Failed to create post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const getAllPosts = async (): Promise<PostArray> => {
    try {
        const posts = await prisma.post.findMany({
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
    catch (error) {
        throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}