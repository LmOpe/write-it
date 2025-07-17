import { prisma } from "../../lib/config";
import { hashPassword, comparePassword, generateToken, blacklistToken } from "../../lib/utils";
import { AllUsers, CreateUserInput, CreatedUser, EditUser, LoginInput, LoginResponse, UserData } from "./user.schemas";
import { UserPostArray } from "../posts/posts.schemas"
import { ApiError } from "../../lib/errors";

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
        throw error;
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
            throw new ApiError("Incorrect username or password", 401);
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
        throw error;
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
        throw error;
    }
}

export const getAllUsers = async (userId: string): Promise<AllUsers> => {
    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
            },
            omit: {
                password: true,

            }
        })
        const normalizedUsers = users.map(user => ({
            ...user,
            email: user.email ?? undefined
        }))

        return normalizedUsers;
    } catch (error: any) {
        throw error;
    }
}

export const updateUser = async (data: EditUser, userId: string, token: string): Promise<UserData> => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { ...data, updatedAt: new Date() }
        });

        const normalizedUser = {
            ...updatedUser,
            password: undefined,
            email: updatedUser.email ?? undefined
        }

        await blacklistToken(token);

        return normalizedUser;
    } catch (error: any) {
        if (error.code === 'P2002') {
            if (error.meta?.target?.includes('email')) {
                throw new ApiError('Email already exist', 409);
            }
        }
        throw error;
    }
};