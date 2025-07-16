import { Request, Response, NextFunction } from 'express';
import { handlePrismaError } from '../lib/prismaErrorHandler';
import { ApiError } from '../lib/errors';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    try {
        handlePrismaError(err);
    } catch (e: any) {
        if (e instanceof ApiError) {
            return res.status(e.statusCode).json({ message: e.message });
        }
    }

    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(status).json({ message });
};