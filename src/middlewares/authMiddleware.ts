import {Request, Response, NextFunction} from 'express';
import { verifyToken } from '../lib/utils';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        const decoded = await verifyToken(token);
        if (decoded === null) {
            return res.status(401).json({ message: 'Invalid access token' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}