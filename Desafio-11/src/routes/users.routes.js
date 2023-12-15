import { Router } from 'express';
import { getUsers } from '../controllers/users.controllers.js';
import { passportError, authorization } from '../utils/messagesError.js';

const userRouter = Router()

userRouter.get('/', passportError('jwt'), authorization('admin'), getUsers);

export default userRouter;
