import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { productModel } from './models/products.models.js';
import { messageModel } from './models/messages.models.js';
import router from './routes/index.routes.js';

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
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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
});

app.use('/', router);



