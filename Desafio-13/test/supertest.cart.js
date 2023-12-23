import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

await mongoose.connect('mongodb+srv://smatulionis123:nmbAS7qjHodMcI4r@cluster0.kodmlqc.mongodb.net/?retryWrites=true&w=majority');

describe('Test CRUD de Cart en la ruta api/cart', function () {
    const token = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ODBjYWUzYWExMjYxMTY0M2E0ZGNkZSIsImZpcnN0X25hbWUiOiJTZWJhc3RpYW4iLCJsYXN0X25hbWUiOiJHb256YWxleiIsImFnZSI6MTUsImVtYWlsIjoicHJ1ZWJhY29kZXI1OTBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYzFldmpjWDI1T2pKUldQa014NDhpdXREcHdJOWNLRGk0ZkdLQkZ3aHk1TVdWYWQ4UHhzTUMiLCJyb2wiOiJhZG1pbiIsImNhcnQiOiI2NTgwZDI0YmJmZjM3ZWUzMzJkNDIxMTAiLCJfX3YiOjB9LCJpYXQiOjE3MDMyODcxNTMsImV4cCI6MTcwMzMzMDM1M30.FqFYdf8foY9yjSwVvCUFQMcLUkhEItYK3UJFiA3kQBw.HYFP9HqXYVS%2BUOTS2kfWI%2F6Z4NElj%2FfaIKGAOBVqwBM';

    it('Ruta: api/cart metodo POST', async () => {
        const cid = '6580d24bbff37ee332d42110';
        const pid = '64ff95da5967a146e90c6606';
        const newProd = {
            quantity: 2
        }

        const { statusCode, _body, ok } = await requester.post(`/api/cart/${cid}/products/${pid}`).set('Cookie', `jwtCookie=${token}`).send(newProd);

        expect(statusCode).to.be.equal(200);

    });

});

