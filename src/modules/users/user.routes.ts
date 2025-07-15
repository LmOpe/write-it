import { Router } from 'express';
import { registerUser, loginUser, getUserDetails } from './user.controller';
import { validateRequest } from '../../middlewares/validateUser';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createUserSchema, loginUserSchema } from './user.schema';

const userRoutes = Router();

userRoutes.post('/register', validateRequest(createUserSchema), registerUser);
userRoutes.post('/login', validateRequest(loginUserSchema), loginUser);
userRoutes.get('/', authMiddleware, getUserDetails);

export default userRoutes;