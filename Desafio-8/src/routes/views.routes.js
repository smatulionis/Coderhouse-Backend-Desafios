import { Router } from 'express';
import { productModel } from '../models/products.models.js';

const viewsRouter = Router();

const authLoggedIn = (req, res, next) => {
    if (req.session.login) {
        return res.redirect('/userprofile');
    }
    return next(); 
}

const authLoggedOut = (req, res, next) => {
    if (!req.session.login) {
        return res.redirect('/userlogin');
    }
    return next(); 
}

const authAdmin = (req, res, next) => {
    if (req.session.user.rol !== 'admin') {
        return res.send('No tiene permisos de admin');
    }
    return next(); 
}

viewsRouter.get('/home', async (req, res) => {
    const products = await productModel.find().lean();
    const homeData = {
    title: 'Home',
    products: products
    };

    if (req.session.login) {
        homeData.user = req.session.user;
    }

    res.render('home', homeData);
});

viewsRouter.get('/realtimeproducts', authLoggedOut, authAdmin, async (req, res) => {
    const products = await productModel.find().lean();
    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products: products,
        js: 'js/realtimeProducts.js'
    })
});

viewsRouter.get('/realtimechat', authLoggedOut, (req, res) => {
    res.render('chat', {
        title: 'Chat',
        js: 'js/chat.js'
    })
});

viewsRouter.get('/userregister', authLoggedIn, (req, res) => {
    res.render('userRegister', {
        title: 'Registro de usuario',
        js: 'js/userRegister.js'
    })
});

viewsRouter.get('/userlogin', authLoggedIn, (req, res) => {
    res.render('userLogin', {
        title: 'Login',
        js: 'js/userLogin.js'
    })
});

viewsRouter.get('/userprofile', (req, res) => {
    if (req.session.login) {
        res.render('userProfile', {
            title:'Perfil usuario',
            js: 'js/userProfile.js',
            user: req.session.user
        });
    } else {
        res.redirect('/userlogin');
    }
});

export default viewsRouter;
