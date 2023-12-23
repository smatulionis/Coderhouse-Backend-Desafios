import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

await mongoose.connect('mongodb+srv://smatulionis123:nmbAS7qjHodMcI4r@cluster0.kodmlqc.mongodb.net/?retryWrites=true&w=majority');

describe('Test Users Session api/sessions', function () {
    let cookie = {}

    it("Ruta: api/sessions/register con metodo POST", async () => {
        const newUser = {
            first_name: "Jorge",
            last_name: "Perez",
            age: 23,
            email: "jorge@perez.com",
            password: "jorge123"
        }

        const { statusCode } = await requester.post('/api/sessions/register').send(newUser);

        expect(statusCode).to.be.equal(201);
    });

    it("Ruta: api/sessions/login con metodo POST", async () => {
        const user = {
            email: "jorge@perez.com",
            password: "jorge123"
        }

        const resultado = await requester.post('/api/sessions/login').send(user);
        const cookieResult = resultado.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        cookie = {
            name: cookieResult.split("=")[0], 
            value: cookieResult.split("=")[1] 
        }

        expect(cookie.name).to.be.ok.and.equal('jwtCookie');
        expect(cookie.value).to.be.ok;
    });

    it("Ruta: api/sessions/current con metodo GET", async () => {

        const { _body } = await requester.get('/api/sessions/current')
            .set('Cookie', [`${cookie.name} = ${cookie.value}`]);

        expect(_body.user.email).to.be.equal('jorge@perez.com');
    });

});