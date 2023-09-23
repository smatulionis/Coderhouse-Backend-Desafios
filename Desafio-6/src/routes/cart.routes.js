import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

const cartRouter = Router();

cartRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartModel.findById(id);
        if (cart) {
            res.status(200).send({ response: 'OK', message: cart });
        } else {
            res.status(404).send({ response: 'Error en consultar carrito', message: 'Carrito no encontrado' });
        }   
    } catch (error) {
        res.status(400).send({ response: 'Error en consultar carrito', message: error });
    }
});

cartRouter.post('/', async (req, res) => {
    
    try {
        const cart = await cartModel.create({});
        res.status(200).send({ response: 'OK', message: cart });
    } catch (error) {
        res.status(400).send({ response: 'Error en crear carrito', message: error });
    }
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod == pid);
                if (index != -1) {
                    cart.products[index].quantity = quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }

                await cartModel.findByIdAndUpdate(cid, cart);
                res.status(200).send({ response: 'Producto agregado con éxito' });
            } else {
                res.status(404).send({ response: 'Error en agregar producto', message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ response: 'Error en agregar producto', message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ response: 'Error en agregar producto', message: error });
    }
});

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod._id == pid);
                if (index != -1) {
                    cart.products.splice(index, 1);
                    await cartModel.findByIdAndUpdate(cid, cart);
                    res.status(200).send({ response: 'Producto eliminado con éxito' });
                } else {
                    res.status(404).send({ response: 'Error en eliminar producto', message: 'Producto no encontrado en el carrito' });
                } 
            } else {
                res.status(404).send({ response: 'Error en eliminar producto', message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ response: 'Error en eliminar producto', message: 'Carrito no encontrado' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send({ response: 'Error en eliminar producto', message: error });
    }
});

cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const newArray = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) { 
            cart.products = [];

            for (const prod of newArray) {
                const newProd = await productModel.findById(prod.id_prod);
                if (newProd) {
                    const index = cart.products.findIndex(item => item.id_prod == prod.id_prod);
                    if (index != -1) {
                        cart.products[index].quantity = prod.quantity;
                    } else {
                        cart.products.push({ id_prod: prod.id_prod, quantity: prod.quantity });
                    }
                } else {
                    res.status(404).send({ response: 'Error en actualizar productos', message: 'Producto no encontrado' });
                    return;
                }
            };
            await cartModel.findByIdAndUpdate(cid, cart);
            res.status(200).send({ response: 'Productos actualizados con éxito' });
        } else {
            res.status(404).send({ response: 'Error en actualizar productos', message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ response: 'Error en actualizar productos', message: error });
    }
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod._id == pid);
            
                if (index != -1) {
                    cart.products[index].quantity = quantity;
                    await cartModel.findByIdAndUpdate(cid, cart);
                    res.status(200).send({ response: 'Producto actualizado con éxito' });
                } else {
                    res.status(404).send({ response: 'Error en actualizar producto', message: 'Producto no encontrado en el carrito' });
                }

            } else {
                res.status(404).send({ response: 'Error en actualizar producto', message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ response: 'Error en actualizar producto', message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ response: 'Error en actualizar producto', message: error });
    }
});

cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            await cartModel.findByIdAndUpdate(cid, cart);
            res.status(200).send({ response: 'Productos eliminados con éxito' });
        } else {
            res.status(404).send({ response: 'Error en eliminar carrito', message: 'Carrito no encontrado' });
        }
        
    } catch (error) {
        res.status(400).send({ response: 'Error en eliminar carrito', message: error });
    }
});

export default cartRouter;