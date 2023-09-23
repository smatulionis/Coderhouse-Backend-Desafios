import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './routes/users.routes.js';
import sessionsRouter from './routes/sessions.routes.js'
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
});

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BD conectada')
    })
    .catch(() => console.log('Error en conexion a BD'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

const staticMiddleware = express.static(path.join(__dirname, '/public'));
const sharedRoutes = ['/realtimeproducts', '/realtimechat', '/userregistry', '/userlogin', '/userprofile'];
sharedRoutes.forEach((route) => {
  app.use(route, staticMiddleware);
});

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
        ttl: 60 
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false
}));

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
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);


