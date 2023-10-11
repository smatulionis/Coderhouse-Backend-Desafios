import { Router } from 'express';
import { userModel } from '../models/users.models.js';
import { passportError, authorization } from '../utils/messagesError.js';

const userRouter = Router()

userRouter.get('/', passportError('jwt'), authorization('admin'), async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({ response: 'OK', message: users });
    } catch (error) {
        res.status(400).send({ response: 'Error en consultar usuarios', message: error });
    }
});

export default userRouter;
