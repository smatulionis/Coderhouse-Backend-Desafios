import { Router } from "express";
import { userModel } from "../models/users.models.js";

const userRouter = Router()

userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({ response: 'OK', message: users });
    } catch (error) {
        res.status(400).send({ response: 'Error en consultar usuarios', message: error });
    }
});

export default userRouter;
