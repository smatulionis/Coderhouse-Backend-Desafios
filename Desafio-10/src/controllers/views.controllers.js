import { productModel } from '../models/products.models.js';
import jwt from 'jsonwebtoken';

export const checkCookie = (req, res, next) => {
    if (req.signedCookies.jwtCookie) {
        return res.redirect('/userprofile');
    }
    return next(); 
}

export const getHome = async (req, res) => {
    const products = await productModel.find().lean();
    const homeData = {
    title: 'Home',
    products: products
    }

    if (req.signedCookies.jwtCookie) {
        const userToken = req.signedCookies.jwtCookie;
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        homeData.user = decoded.user;
    }
    
    res.render('home', homeData);
}

export const getRealtimeProducts = async (req, res) => {
    const products = await productModel.find().lean();
    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products: products,
        js: 'js/realtimeProducts.js'
    });
}

export const getRealtimeChat = async (req, res) => {
    res.render('chat', {
        title: 'Chat',
        js: 'js/chat.js'
    });
}

export const getUserRegister = async (req, res) => {
    res.render('userRegister', {
        title: 'Registro de usuario',
        js: 'js/userRegister.js'
    })
}

export const getUserLogin = async (req, res) => {
    res.render('userLogin', {
        title: 'Login',
        js: 'js/userLogin.js'
    });
}

export const getuserProfile = async (req, res) => {
    res.render('userProfile', {
        title:'Perfil usuario',
        js: 'js/userProfile.js',
        user: req.user
    });
}