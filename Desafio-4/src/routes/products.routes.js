import ProductManager from '../ProductManager.js';
import { Router } from "express";

const productManager = new ProductManager();
const prodsRouter = Router();

prodsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    
    if (!limit || limit > products.length) {
        res.status(200).send(products);
    } else {
        const limitProducts = products.slice(0, limit);
        res.status(200).send(limitProducts);
    }
    
});

prodsRouter.get('/:pid', async (req, res) => { 
    const { pid } = req.params;
    const productById = await productManager.getProductById(parseInt(pid)); 

    if (productById) {
        res.status(200).send(productById);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

prodsRouter.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);

    if(newProduct) {
        res.status(400).send("El producto ya existe");
    } else {
        res.status(200).send("Producto creado");
    }
});

prodsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const findedProduct = await productManager.getProductById(parseInt(pid));

    if(findedProduct) {
        await productManager.updateProduct(parseInt(pid), req.body);
        res.status(200).send("Producto actualizado");
    } else {
        res.status(404).send("Producto no encontrado");  
    }
});

prodsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const findedProduct = await productManager.getProductById(parseInt(id));

    if(findedProduct) {
        await productManager.deleteProduct(parseInt(id));
        res.status(200).send("Producto eliminado");
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

export default prodsRouter;