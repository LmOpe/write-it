import { prisma } from "../../lib/config";
import { hashPassword, comparePassword, generateToken, blacklistToken } from "../../lib/utils";
import { CreateUserInput, CreatedUser, LoginInput, LoginResponse } from "./user.schemas";
import { UserPostArray } from "../posts/posts.schemas"

export const createUser = async (user: CreateUserInput): Promise<CreatedUser> => {

    try {
        const hashedPassword = await hashPassword(user.password);

        const newUser = await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        })
        const result: CreatedUser = {
            id: newUser.id,
            username: newUser.username,
        };

        if (newUser.email != null) {
            result.email = newUser.email;
        }

        return result;

    } catch (error: any) {
        if (
            error.code === 'P2002'
        ) {
            if (error.meta?.target?.includes('email')) {
                throw new Error('Email already exist');
            }
            else if (error.meta?.target?.includes('username')) {
                throw new Error('Username already exist');
            }
        }
        throw new Error('Failed to create user');
    }
}


export const authenticate = async (data: LoginInput): Promise<LoginResponse> => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                username: data.username
            }
        })

        const isMatch = await comparePassword(data.password, user.password)
        if (!isMatch) {
            throw new Error("Incorrect username or password");
        }

        const tokenPayload: {
            id: string;
            username: string;
            email?: string;
        } = {
            id: user.id,
            username: data.username,
        };

        if (user.email) {
            tokenPayload.email = user.email;
        }

        const accessToken = await generateToken(tokenPayload);
        return { accessToken: accessToken };

    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error("Incorrect username or password");
        }
        else {
            throw error;
        }
    }

}

export const logout = async (token: string): Promise<void> => {
    try {
        await blacklistToken(token);
    } catch (error: any) {
        throw new Error(`Failed to logout: ${error?.message}`);
    }
}

export const getUserPosts = async (userId: string): Promise<UserPostArray> => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId,
                published: true
            },
            omit: {
                authorId: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return posts;
    } catch (error: any) {
        throw new Error(`Failed to get user posts: ${error?.message}`);
    }
}