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

                const findedCart = await cartModel.findByIdAndUpdate(cid, cart);
                res.status(200).send({ Response: 'OK', Message: findedCart });
            } else {
                res.status(404).send({ Response: 'Error en agregar producto al carrito', Message: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ Response: 'Error en agregar producto al carrito', Message: 'Carrito no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ Response: 'Error en agregar producto al carrito', Message: error });
    }
});

export default cartRouter;