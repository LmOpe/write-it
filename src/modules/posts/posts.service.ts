import { prisma } from "../../lib/config";
import { CreatePostInput, PostWithoutAuthor } from './posts.schemas';
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