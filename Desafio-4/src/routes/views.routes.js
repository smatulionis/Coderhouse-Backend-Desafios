import ProductManager from '../ProductManager.js';
import { Router } from "express";


const productManager = new ProductManager();
const viewsRouter = Router();

viewsRouter.get('/home', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {
        title:"Home",
        products: products
    });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        title: "Real Time Products",
    })
});


export default viewsRouter;
