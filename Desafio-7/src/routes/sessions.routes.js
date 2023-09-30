import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post('/login', passport.authenticate('login'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ message: "Usuario inválido" });
        }

        req.session.login = true;
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }

        res.status(200).send({ message: 'Login válido' });
    } catch (error) {
        res.status(500).send({ message: `Error al iniciar sesión ${error}` });
    }
});

sessionsRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ message: "Usuario ya existente" })
        }

        res.status(200).send({ message: 'Usuario creado con éxito' })
    } catch (error) {
        res.status(500).send({ message: `Error al registrar usuario ${error}` })
    }
})

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

});

sessionsRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: 'Usuario logueado' });
});

sessionsRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    } 
    res.status(200).send({ response: 'Usuario deslogueado' });
});

export default sessionsRouter;