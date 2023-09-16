import { Router } from "express";
import { productModel } from '../models/products.models.js';

const viewsRouter = Router();

viewsRouter.get('/home', async (req, res) => {
    const products = await productModel.find().lean();
    res.render('home', {
        title:"Home",
        products: products,
    });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productModel.find().lean();
    res.render('realTimeProducts', {
        title: "Productos en tiempo real",
        products: products,
        js: "js/script.js"
    })
});

viewsRouter.get('/realtimechat', (req, res) => {
    res.render('chat', {
        title: "Chat",
        js: "js/chat.js"
    })
});

export default viewsRouter;
