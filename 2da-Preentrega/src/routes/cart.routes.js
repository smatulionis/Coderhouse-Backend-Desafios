import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

const cartRouter = Router();

cartRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartModel.findById(id);
        if (cart) {
            res.status(200).send({ Response: 'OK', Message: cart });
        } else {
            res.status(404).send({ Response: 'Error en consultar carrito', Message: 'Carrito no encontrado' });
        }   
    } catch (error) {
        res.status(400).send({ Response: 'Error en consultar carrito', Message: error });
    }
});

cartRouter.post('/', async (req, res) => {
    
    try {
        const cart = await cartModel.create({});
        res.status(200).send({ Response: 'OK', Message: cart });
    } catch (error) {
        res.status(400).send({ Response: 'Error en crear carrito', Message: error });
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

                const updatedCart = await cartModel.findByIdAndUpdate(cid, cart);
                res.status(200).send({ Response: 'OK', Message: updatedCart });
            } else {
                res.status(404).send({ Response: 'Error en agregar producto', Message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ Response: 'Error en agregar producto', Message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ Response: 'Error en agregar producto', Message: error });
    }
});

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod == pid);
                if (index != -1) {
                    cart.products.splice(index, 1);
                    const updatedCart = await cartModel.findByIdAndUpdate(cid, cart);
                    res.status(200).send({ Response: 'OK', Message: updatedCart });
                } else {
                    res.status(404).send({ Response: 'Error en eliminar producto', Message: 'Producto no encontrado en el carrito' });
                } 
            } else {
                res.status(404).send({ Response: 'Error en eliminar producto', Message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ Response: 'Error en eliminar producto', Message: 'Carrito no encontrado' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send({ Response: 'Error en eliminar producto', Message: error });
    }
});

cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const newArray = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) { 
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
                    res.status(404).send({ Response: 'Error en actualizar productos', Message: 'Producto no encontrado' });
                    return;
                }
            };
            await cartModel.findByIdAndUpdate(cid, cart);
            res.status(200).send({ Response: 'Productos actualizados con éxito' });
        } else {
            res.status(404).send({ Response: 'Error en actualizar productos', Message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ Response: 'Error en actualizar productos', Message: error });
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
                const index = cart.products.findIndex(item => item.id_prod == pid);
                if (index != -1) {
                    cart.products[index].quantity = quantity;
                    const updatedCart = await cartModel.findByIdAndUpdate(cid, cart);
                    res.status(200).send({ Response: 'OK', Message: updatedCart });
                } else {
                    res.status(404).send({ Response: 'Error en actualizar producto', Message: 'Producto no encontrado en el carrito' });
                }

            } else {
                res.status(404).send({ Response: 'Error en actualizar producto', Message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ Response: 'Error en actualizar producto', Message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ Response: 'Error en actualizar producto', Message: error });
    }
});

cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            const updatedCart = await cartModel.findByIdAndUpdate(cid, cart);
            res.status(200).send({ Response: 'OK', Message: updatedCart });
        } else {
            res.status(404).send({ Response: 'Error en eliminar carrito', Message: 'Carrito no encontrado' });
        }
        
    } catch (error) {
        res.status(400).send({ Response: 'Error en eliminar carrito', Message: error });
    }
});

export default cartRouter;