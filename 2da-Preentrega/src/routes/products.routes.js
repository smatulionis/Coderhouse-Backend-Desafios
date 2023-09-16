import { Router } from "express";
import { productModel } from "../models/products.models.js";

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
        res.status(400).send({ Status: 'Error', Message: error });
    }
});

prodsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findById(id);
        if (prod)
            res.status(200).send({ Response: 'OK', Message: prod });
        else
            res.status(404).send({ Response: 'Error en consultar producto', Message: 'Producto no encontrado' });
    } catch (error) {
        res.status(400).send({ Response: 'Error en consultar producto', Message: error });
    }
});

prodsRouter.post('/', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category });
        res.status(200).send({ Response: 'OK', Message: prod });
    } catch (error) {
        res.status(400).send({ Response: 'Error en crear productos', Message: error });
    }
});

prodsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, stock, status, code, price, category } = req.body;

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category });
        if (prod)
            res.status(200).send({ Response: 'OK', Message: 'Producto actualizado' });
        else
            res.status(404).send({ Response: 'Error en actualizar Producto', Message: 'Producto no encontrado' });
    } catch (error) {
        res.status(400).send({ Response: 'Error en actualizar producto', Message: error });
    }
});

prodsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findByIdAndDelete(id);
        if (prod)
            res.status(200).send({ Response: 'OK', Message: 'Producto eliminado' });
        else
            res.status(404).send({ Response: 'Error en eliminar Producto', Message: 'Producto no encontrado' });
    } catch (error) {
        res.status(400).send({ Response: 'Error en eliminar producto', Message: error });
    }
});


export default prodsRouter;
