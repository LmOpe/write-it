import { Router } from 'express';
import {
    registerUser,
    loginUser,
    getUserDetails,
    logoutUser,
    getUserPostsHandler,
    getAllUsersHandler,
    updateUserHandler,
    getAuthUserPostsHandler
} from './user.controller';
import { validateRequest } from '../../middlewares/validateUser';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
    createUserSchema,
    editUserSchema,
    loginUserSchema
} from './user.schemas';

const userRoutes = Router();

userRoutes.post('/register', validateRequest({ body: createUserSchema }), registerUser);
userRoutes.post('/login', validateRequest({ body: loginUserSchema }), loginUser);
userRoutes.get('/me', authMiddleware, getUserDetails);
userRoutes.post('/logout', authMiddleware, logoutUser);
userRoutes.get('/:id/posts', authMiddleware, getUserPostsHandler);
userRoutes.get('/', authMiddleware, getAllUsersHandler);
userRoutes.patch('/', authMiddleware, validateRequest({ body: editUserSchema }), updateUserHandler);
userRoutes.get('/posts', authMiddleware, getAuthUserPostsHandler)

export default userRoutes;