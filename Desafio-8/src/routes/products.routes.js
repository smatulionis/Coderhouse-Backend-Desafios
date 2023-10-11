import { Router } from 'express';
import { productModel } from '../models/products.models.js';
import { passportError, authorization } from '../utils/messagesError.js';

const prodsRouter = Router();

prodsRouter.get('/', async (req, res) => {
    const { limit, page, category, status, sort } = req.query;
    const parsedLimit = isNaN(parseInt(limit)) ? 10 : parseInt(limit);
    const parsedCategory = category === 'undefined' ? '' : category;
    const parsedStatus = status === 'undefined' ? '' : status;
    const parsedSort = sort === 'undefined' ? undefined : sort;

    try {
        const queryObj = {};
        if (parsedCategory) {
            queryObj.category = parsedCategory;
        }
        if (parsedStatus) {
            queryObj.status = parsedStatus;
        }

        const prods = await productModel.paginate(queryObj, { limit: parsedLimit, page: page ?? 1, sort: parsedSort ? { price: parsedSort } : undefined, customLabels: { docs: 'payload' } });

        const response = {
            status: 'success',
            payload: prods.payload,
            totalPages: prods.totalPages,
            prevPage: prods.prevPage,
            nextPage: prods.nextPage,
            page: prods.page,
            hasPrevPage: prods.hasPrevPage,
            hasNextPage: prods.hasNextPage,
            prevLink: prods.hasPrevPage ? `/api/products?limit=${limit}&page=${prods.prevPage}&category=${parsedCategory}&status=${parsedStatus}&sort=${sort}` : null,
            nextLink: prods.hasNextPage ? `/api/products?limit=${limit}&page=${prods.nextPage}&category=${parsedCategory}&status=${parsedStatus}&sort=${sort}` : null
        };

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ Status: 'Error', message: error });
    }
});

prodsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findById(id);
        if (prod)
            res.status(200).send({ response: 'OK', message: prod });
        else
            res.status(404).send({ response: 'Error en consultar producto', message: 'Producto no encontrado' });
    } catch (error) {
        res.status(400).send({ response: 'Error en consultar producto', message: error });
    }
});

prodsRouter.post('/', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category });
        res.status(200).send({ response: 'OK', message: prod });
    } catch (error) {
        res.status(400).send({ response: 'Error en crear productos', message: error });
    }
});

prodsRouter.put('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { id } = req.params;
    const { title, description, stock, status, code, price, category } = req.body;

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category });
        if (prod)
            res.status(200).send({ response: 'OK', message: 'Producto actualizado' });
        else
            res.status(404).send({ response: 'Error en actualizar Producto', message: 'Producto no encontrado' });
    } catch (error) {
        res.status(400).send({ response: 'Error en actualizar producto', message: error });
    }
});

prodsRouter.delete('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findByIdAndDelete(id);
        if (prod)
            res.status(200).send({ response: 'OK', message: 'Producto eliminado' });
        else
            res.status(404).send({ response: 'Error en eliminar Producto', message: 'Producto no encontrado' });
    } catch (error) {
        res.status(400).send({ response: 'Error en eliminar producto', message: error });
    }
});


export default prodsRouter;
