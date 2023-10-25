import { generateToken } from '../utils/jwt.js';

export const postLogin = async (req, res) => {
    try {
        const token = generateToken(req.user);
        res.cookie('jwtCookie', token, {
            maxAge: 43200000,
            signed: true,
            httpOnly: true
        });
        return res.status(200).send({ message: 'Login válido' });
    } catch (error) {
        res.status(500).send({ error: `Error al iniciar sesión ${error}` });
    }
}

export const postRegister = async (req, res) => {
    try {
        return res.status(201).send({ message: 'Usuario creado con éxito' })
    } catch (error) {
        res.status(500).send({ error: `Error al registrar usuario ${error}` })
    }
}

export const getGithubCallback = async (req, res) => {
    const token = generateToken(req.user);
    res.cookie('jwtCookie', token, {
        maxAge: 43200000,
        signed: true,
        httpOnly: true
    });
    res.redirect('/home');
}

export const getLogout = async (req, res) => { 
    res.clearCookie('jwtCookie');
    res.status(200).send({ message: 'Usuario deslogueado' });
}

export const getCurrentToken = async (req, res) => {
    res.send(req.user);
}