import { Router } from 'express';
import { registerUser, loginUser, getUserDetails, logoutUser } from './user.controller';
import { validateRequest } from '../../middlewares/validateUser';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createUserSchema, loginUserSchema } from './user.schemas';

const userRoutes = Router();

userRoutes.post('/register', validateRequest({body: createUserSchema}), registerUser);
userRoutes.post('/login', validateRequest({body: loginUserSchema}), loginUser);
userRoutes.get('/', authMiddleware, getUserDetails);
userRoutes.post('/logout', authMiddleware, logoutUser);

export default userRoutes;