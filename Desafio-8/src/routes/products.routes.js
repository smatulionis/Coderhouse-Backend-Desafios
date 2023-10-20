import { Router } from 'express';
import { getProducts, getProductById, postProduct, putProductById, deleteProductById } from '../controllers/products.controllers.js';
import { passportError, authorization } from '../utils/messagesError.js';

const prodsRouter = Router();

prodsRouter.get('/', getProducts);
prodsRouter.get('/:id', getProductById);
prodsRouter.post('/', passportError('jwt'), authorization('admin'), postProduct);
prodsRouter.put('/:id', passportError('jwt'), authorization('admin'), putProductById);
prodsRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProductById);

export default prodsRouter;
