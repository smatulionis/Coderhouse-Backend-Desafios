import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionsRouter = Router();


sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (req.session.login) {
            res.status(200).send({ response: 'Login ya existente', user: req.session.user })
        } else {
            const user = await userModel.findOne({ email: email });

            if (user) {
                if (user.password == password) {
                    req.session.login = true;
                    req.session.user = user;
                    res.status(200).send({ response: 'Login válido', user: user })
                } else {
                    res.status(401).send({ response: 'Contraseña no válida', message: password });
                }
            } else {
                res.status(404).send({ response: 'Usuario no encontrado', message: user });
            }
        }
    } catch (error) {
        res.status(400).send({ error: `Error en Login: ${error}` });
    }
});

sessionsRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    } 
    res.status(200).send({ response: 'Usuario deslogueado' });
});

export default sessionsRouter;