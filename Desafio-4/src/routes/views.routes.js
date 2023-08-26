import ProductManager from '../ProductManager.js';
import { Router } from "express";

const productManager = new ProductManager();
const products = await productManager.getProducts();
const viewsRouter = Router();

viewsRouter.get('/home', async (req, res) => {
    res.render('home', {
        title:"Home",
        products: products
    });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {
        title: "Productos en tiempo real",
        products: products
    })
});

export default viewsRouter;
