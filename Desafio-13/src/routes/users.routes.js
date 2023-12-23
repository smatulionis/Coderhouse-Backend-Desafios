import { Router } from 'express';
import { getUsers, passwordRecovery, resetPassword } from '../controllers/users.controllers.js';
import { passportError, authorization } from '../utils/messagesError.js';

const userRouter = Router()

userRouter.get('/', passportError('jwt'), authorization('admin'), getUsers);
userRouter.post('/password-recovery', passwordRecovery);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;
