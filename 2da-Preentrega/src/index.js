import express from 'express';
import mongoose from 'mongoose';
import prodsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import viewsRouter from './routes/views.routes.js';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { productModel } from './models/products.models.js';
import { messageModel } from './models/messages.models.js';

const app = express();
const PORT = 8080;

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})

mongoose.connect('mongodb+srv://smatulionis123:nmbAS7qjHodMcI4r@cluster0.kodmlqc.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('BD conectada'))
    .catch(() => console.log('Error en conexion a BD'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')));
app.use('/realtimechat', express.static(path.join(__dirname, '/public')));

const io = new Server(serverExpress);

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    
    socket.on('newProduct', async (newProd) => {
        await productModel.create(newProd);
        const newProducts = await productModel.find().lean();
        socket.emit('prods', newProducts);
    })

    socket.on('message', async (messageInfo) => {
        await messageModel.create(messageInfo);
        const newMessage = await messageModel.find().lean();
        socket.emit('messages', newMessage);
    })
})

app.use('/api/products', prodsRouter);
app.use('/api/cart', cartRouter);
app.use('/', viewsRouter);


