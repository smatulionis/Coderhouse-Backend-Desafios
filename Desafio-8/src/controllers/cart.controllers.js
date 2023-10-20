import { cartModel } from '../models/carts.models.js';
import { productModel } from '../models/products.models.js';

export const getCart = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartModel.findById(id);

        if (cart) {
            return res.status(200).send(cart);
        } 
        res.status(404).send({ error: 'Carrito no encontrado' });
          
    } catch (error) {
        res.status(500).send({ error: `Error en consultar carrito ${error}` });
    }
}

export const postCartProduct = async (req, res) => {
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
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }

                await cart.save();
                const updatedCart = await cartModel.findById(cid);
                return res.status(200).send(updatedCart);
            } 
            res.status(404).send({ error: 'Producto no encontrado' });
        } 
        res.status(404).send({ error: 'Carrito no encontrado' });

    } catch (error) {
        res.status(500).send({ error: `Error en agregar producto al carrito ${error}` });
    }
}

export const deleteCartProduct = async (req, res) => {
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
                    return res.status(200).send(cart);
                } 
                res.status(404).send({ error: 'Producto no encontrado en el carrito' });
            } 
            res.status(404).send({ error: 'Producto no encontrado' });
        } 
        res.status(404).send({ error: 'Carrito no encontrado' });
    
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar producto ${error}` });
    }
}

export const putCart = async (req, res) => {
    const { cid } = req.params;
    const newArray = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) { 
            for (const prod of newArray) {
                const newProd = await productModel.findById(prod.id_prod);
                if (newProd) {
                    const index = cart.products.findIndex(item => item.id_prod._id == prod.id_prod);
                    if (index != -1) {
                        cart.products[index].quantity = prod.quantity;
                    } else {
                        cart.products.push({ id_prod: prod.id_prod, quantity: prod.quantity });
                    }
                } else {
                    res.status(404).send({ error: 'Producto no encontrado' });
                    return;
                }
            }
            await cartModel.findByIdAndUpdate(cid, cart);
            return res.status(200).send(cart);
        } 
        res.status(404).send({ error: 'Carrito no encontrado' });

    } catch (error) {
        res.status(500).send({ error: `Error en actualizar productos ${error}` });
    }
}

export const putCartProduct = async (req, res) => {
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
                    return res.status(200).send(cart);
                } 
                res.status(404).send({ error: 'Producto no encontrado en el carrito' });
            }
            res.status(404).send({ error: 'Producto no encontrado' });
        } 
        res.status(404).send({ error: 'Carrito no encontrado' });
        
    } catch (error) {
        res.status(500).send({ error: `Error en actualizar producto ${error}` });
    }
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            await cartModel.findByIdAndUpdate(cid, cart);
            return res.status(200).send(cart);
        } 
        res.status(404).send({ error: 'Carrito no encontrado' });        
        
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar carrito ${error}` });
    }
}