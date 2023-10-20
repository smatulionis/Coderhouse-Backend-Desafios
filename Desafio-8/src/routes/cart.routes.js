import { Router } from 'express';
import { getCart, postCartProduct, deleteCartProduct, putCart, putCartProduct, deleteCart } from '../controllers/cart.controllers.js';
import { passportError } from '../utils/messagesError.js';

const cartRouter = Router();

cartRouter.get('/:id', passportError('jwt'), getCart);
cartRouter.post('/:cid/products/:pid', passportError('jwt'), postCartProduct);
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), deleteCartProduct);
cartRouter.put('/:cid', passportError('jwt'), putCart);
cartRouter.put('/:cid/products/:pid', passportError('jwt'), putCartProduct);
cartRouter.delete('/:cid', passportError('jwt'), deleteCart);

export default cartRouter;