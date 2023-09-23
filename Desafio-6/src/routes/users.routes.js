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

userRouter.post('/', async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    try {
        await userModel.create({ first_name, last_name, age, email, password });
        res.status(200).send({ response: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(400).send({ response: 'Error en crear usuario', message: error });
    }
});

export default userRouter;
