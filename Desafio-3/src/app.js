import ProductManager from './ProductManager.js';
import express from 'express';
// prueba
const PORT = 4000;
const app = express();
const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    
    if (!limit || limit > products.length) {
        res.send(products);
    } else {
        const limitProducts = products.slice(0, limit);
        res.send(limitProducts);
    }
    
})

app.get('/products/:pid', async (req, res) => { 
    const products = await productManager.getProducts();
    const productById = products.find(prod => prod.id === parseInt(req.params.pid)); 

    if (productById) {
        res.send(productById);
    } else {
        res.send("Producto no existente");
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})
