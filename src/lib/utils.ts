import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { redisClient } from "./config";
import { ApiError } from "./errors";
import { PostArray } from "modules/posts/posts.schemas";
import { CommentArray } from "modules/comments/comment.schemas";

interface PaginatedResponse<T> {
    message: string;
    [key: string]: any;
    currentPage: number,
    totalPages: number;
}

function paginateData<T>(
    items: T[],
    page: number,
    limit: number,
    itemKey: string,
    totalKey: string
): PaginatedResponse<T> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginateItems = items.slice(startIndex, endIndex);

    return {
        message: `${itemKey[0].toUpperCase() + itemKey.slice(1)} fetched successfully`,
        [itemKey]: paginateItems,
        [totalKey]: items.length,
        currentPage: page,
        totalPages: Math.ceil(items.length / limit)
    };
}

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns A promise that resolves to the hashed password.
 */

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

/**
 * Compares a password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}


/**
 * Generate JWT token for user authentication.
 * @param data - The data to encode in the JWT.
 * @returns A promise that resolves to the generated JWT token.
 */
export async function generateToken(data: object): Promise<string> {
    const secretKey = process.env.JWT_SECRET || "some-random-secret-key";
    const token = jwt.sign(data, secretKey, { expiresIn: '1h' });
    return token;
}

/** * Verifies a JWT token.
 * @param token - The JWT token to verify.
 * @returns A promise that resolves to the decoded token data if valid, or null if invalid.
 */
export async function verifyToken(token: string): Promise<object | null> {
    const secretKey = process.env.JWT_SECRET || "some-random-secret-key";
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded as object;
    } catch (error) {
        return null;
    }
}

/**
 * Blacklists a JWT token by storing it in a blacklist.
 * @param token - The JWT token to blacklist.
 */
export async function blacklistToken(token: string): Promise<void> {
    const decoded = jwt.decode(token) as { exp?: number };

    if (!decoded?.exp) {
        throw new ApiError('Invalid token: No expiration time found', 401);
    }

    const tokenTTL = decoded.exp - Math.floor(Date.now() / 1000);

    if (tokenTTL <= 0) {
        throw new ApiError('Invalid token: Token has already expired', 401);
    }

    await redisClient.set(token, 'blacklisted', {
        expiration: {
            type: 'EX',
            value: tokenTTL
        }
    })
}

/**
 * Create slug from a title and current time.
 * @param title - The title to create a slug from.
 * @return The generated slug.
 */
export async function createSlug(title: string): Promise<string> {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 50);

    return `${slug}-${Date.now()}`;
}

/**
 * Paginate posts based on the provided page and limit.
 * @param posts - The array of posts to paginate.
 * @param page - The current page number.
 * @param limit - The number of posts per page.
 */
export async function paginatePosts(posts: any[], page: number, limit: number): Promise<PaginatedResponse<PostArray>> {
    const response = paginateData<PostArray>(
        posts,
        page,
        limit,
        'posts',
        'totalPosts'
    )

    return response;
}

/**
 * Paginate comments based on the provided page and limit.
 * @param comments - The array of comments to paginate.
 * @param page - The current page number.
 * @param limit - The number of comments per page.
 */
export async function paginateComments(comments: any[], page: number, limit: number): Promise<PaginatedResponse<CommentArray>> {
    const response = paginateData<CommentArray>(
        comments,
        page,
        limit,
        'comments',
        'totalComments'
    )

    return response;
}