import { Router } from 'express';
import { productModel } from '../models/products.models.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { passportError, authorization } from '../utils/messagesError.js';

const viewsRouter = Router();

const checkCookie = (req, res, next) => {
    if (req.cookies.jwtCookie) {
        return res.redirect('/userprofile');
    }
    return next(); 
}

viewsRouter.get('/home', async (req, res) => {
    const products = await productModel.find().lean();
    const homeData = {
    title: 'Home',
    products: products
    }

    if (req.cookies.jwtCookie) {
        const userToken = req.cookies.jwtCookie;
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        homeData.user = decoded.user;
    }
    
    res.render('home', homeData);
});

viewsRouter.get('/realtimeproducts', passportError('jwt'), authorization('admin'), async (req, res) => {
    const products = await productModel.find().lean();
    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products: products,
        js: 'js/realtimeProducts.js'
    });
});

viewsRouter.get('/realtimechat', passportError('jwt'), async (req, res) => {
    res.render('chat', {
        title: 'Chat',
        js: 'js/chat.js'
    });
});

viewsRouter.get('/userregister', checkCookie, (req, res) => {
    res.render('userRegister', {
        title: 'Registro de usuario',
        js: 'js/userRegister.js'
    })
});

viewsRouter.get('/userlogin', checkCookie, async (req, res) => {
    res.render('userLogin', {
        title: 'Login',
        js: 'js/userLogin.js'
    });
});

viewsRouter.get('/userprofile', passport.authenticate('jwt', { session: false, failureRedirect: '/userlogin' }), async (req, res) => {
    res.render('userProfile', {
        title:'Perfil usuario',
        js: 'js/userProfile.js',
        user: req.user
    });
});

export default viewsRouter;
