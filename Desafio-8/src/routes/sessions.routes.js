import { Router } from 'express';
import passport from 'passport';
import { passportError, authorization } from '../utils/messagesError.js';
import { generateToken } from '../utils/jwt.js';
const sessionsRouter = Router();

sessionsRouter.post('/login', passportError('login'), async (req, res) => {
    try {
        const token = generateToken(req.user);
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        });
        res.status(200).send({ message: 'Login válido' });
    } catch (error) {
        res.status(500).send({ message: `Error al iniciar sesión ${error}` });
    }
});

sessionsRouter.post('/register', passportError('register'), async (req, res) => {
    try {
        res.status(200).send({ message: 'Usuario creado con éxito' })
    } catch (error) {
        res.status(500).send({ message: `Error al registrar usuario ${error}` })
    }
})

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

});

sessionsRouter.get('/githubCallback', passport.authenticate('github', { session: false, failureRedirect: '/userlogin' }), async (req, res) => {
    const token = generateToken(req.user);
    res.cookie('jwtCookie', token, {
        maxAge: 43200000
    });
    res.redirect('/home');
});

sessionsRouter.get('/logout', passportError('jwt'), async (req, res) => { 
    res.clearCookie('jwtCookie');
    res.status(200).send({ message: 'Usuario deslogueado' });
});

sessionsRouter.get('/current', passportError('jwt'), authorization('user'), async (req, res) => {
    res.send(req.user);
});

export default sessionsRouter;