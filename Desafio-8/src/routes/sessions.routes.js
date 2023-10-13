import { Router } from 'express';
import passport from 'passport';
import { passportError, authorization } from '../utils/messagesError.js';
import { generateToken } from '../utils/jwt.js';
const sessionsRouter = Router();

sessionsRouter.post('/login', passport.authenticate('login'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ message: 'Usuario inválido' });
        }

        req.session.login = true;
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol: req.user.rol
        }

        const token = generateToken(req.user);
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        });
        res.status(200).send({ message: 'Login válido' });
    } catch (error) {
        res.status(500).send({ message: `Error al iniciar sesión ${error}` });
    }
});

sessionsRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ message: 'Usuario ya existente' })
        }

        res.status(200).send({ message: 'Usuario creado con éxito' })
    } catch (error) {
        res.status(500).send({ message: `Error al registrar usuario ${error}` })
    }
})

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

});

sessionsRouter.get('/githubCallback', passport.authenticate('github', { failureRedirect: '/userlogin' }), async (req, res) => {
        req.session.login = true;
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol: req.user.rol
        }
        res.redirect('/home');
});

sessionsRouter.get('/logout', (req, res) => {
    // if (req.session.login) {
    //     req.session.destroy();
    // } 
    res.clearCookie('jwtCookie');
    res.status(200).send({ message: 'Usuario deslogueado' });
});

sessionsRouter.get('/current', passportError('jwt'), authorization('user'), (req, res) => {
    res.send(req.user);
});

export default sessionsRouter;