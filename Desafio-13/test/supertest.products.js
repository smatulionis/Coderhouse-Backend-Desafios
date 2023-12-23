import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

await mongoose.connect('mongodb+srv://smatulionis123:nmbAS7qjHodMcI4r@cluster0.kodmlqc.mongodb.net/?retryWrites=true&w=majority');

describe('Test CRUD de Productos en la ruta api/products', function () {
    const token = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ODBjYWUzYWExMjYxMTY0M2E0ZGNkZSIsImZpcnN0X25hbWUiOiJTZWJhc3RpYW4iLCJsYXN0X25hbWUiOiJHb256YWxleiIsImFnZSI6MTUsImVtYWlsIjoicHJ1ZWJhY29kZXI1OTBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYzFldmpjWDI1T2pKUldQa014NDhpdXREcHdJOWNLRGk0ZkdLQkZ3aHk1TVdWYWQ4UHhzTUMiLCJyb2wiOiJhZG1pbiIsImNhcnQiOiI2NTgwZDI0YmJmZjM3ZWUzMzJkNDIxMTAiLCJfX3YiOjB9LCJpYXQiOjE3MDMyODcxNTMsImV4cCI6MTcwMzMzMDM1M30.FqFYdf8foY9yjSwVvCUFQMcLUkhEItYK3UJFiA3kQBw.HYFP9HqXYVS%2BUOTS2kfWI%2F6Z4NElj%2FfaIKGAOBVqwBM';

    it('Ruta: api/products metodo GET', async () => {
        const { ok } = await requester.get('/api/products');

        expect(ok).to.be.ok;

    });

    it('Ruta: api/products metodo GET{:id}', async () => {
        const id = '64ff95da5967a146e90c6606';
        const { ok } = await requester.get(`/api/products/${id}`);

        expect(ok).to.be.ok;

    });

    it('Ruta: api/products metodo POST', async () => {
        const newProd = {
            title: "Plancha",
            description: "Plancha grande",
            price: 200000,
            stock: 200,
            category: "Electro",
            code: "AAA-100"
        }

        const { statusCode, _body, ok } = await requester.post('/api/products').set('Cookie', `jwtCookie=${token}`).send(newProd);

        expect(statusCode).to.be.equal(201);

    });

    it('Ruta: api/products metodo PUT', async () => {
        const id = '658619a0febad85095ffcb10'
        const updateProd = {
            title: "Televisor",
            description: "Televisor de 70 pulgadas",
            price: 600000,
            stock: 100,
            category: "Electro",
            code: "AAA-200"
        }

        const { ok } = await requester.put(`/api/products/${id}`).set('Cookie', `jwtCookie=${token}`).send(updateProd);

        expect(ok).to.be.ok;

    });

    it('Ruta: api/products metodo DELETE', async () => {
        const id = '6586200ad42d8475a7423252';
        const { ok } = await requester.delete(`/api/products/${id}`).set('Cookie', `jwtCookie=${token}`);

        expect(ok).to.be.ok;

    });

});
