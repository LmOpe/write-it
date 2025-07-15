import { Request, Response } from 'express';
import { createUser, authenticate } from '../users/user.service';
import { generateToken } from '../../lib/utils';
import { createdUserSchema, CreatedUser } from '../users/user.schema';

export const registerUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const data = await createUser({ email, username, password });
        const token = await generateToken({ id: data.id, name: data.username });
        res.status(201).json({
            message: 'User created successfully',
            user: data,
            accessToken: token
        });
    } catch (error: any) {
        if (error.message !== null) {
            return res.status(409).json({ message: error.message });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try {
        const accessToken = await authenticate({username, password})
        res.status(200).json({
            "message": "User login successful",
            accessToken: accessToken
        })
    } catch (error: any) {
        res.status(401).json({message: error.message})
    }
}
export const getUserDetails = async (req: Request, res: Response) => {
    const user: CreatedUser = createdUserSchema.parse(req.user);
    res.status(200).json({
        message: "User details retrieved successfully",
        user: user
    });
}