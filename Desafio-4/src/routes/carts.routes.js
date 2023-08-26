import CartManager from '../CartManager.js';
import { Router } from "express";

const cartManager = new CartManager();
const cartsRouter = Router();

cartsRouter.get('/:cid', async (req, res) => { 
    const { cid } = req.params;
    const cartById = await cartManager.getCartById(parseInt(cid)); 

    if (cartById) {
        res.status(200).send(cartById);
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

cartsRouter.post('/', async (req, res) => {
    await cartManager.addCart(req.body);
    res.status(200).send("Carrito creado");
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const newProduct = await cartManager.addProduct(parseInt(cid), parseInt(pid));

    if(newProduct) {
        res.status(200).send("Producto agregado exitosamente");
    } else {
        res.status(400).send("El producto no se pudo agregar");
    }
});

export default cartsRouter;