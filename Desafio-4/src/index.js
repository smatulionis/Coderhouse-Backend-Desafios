import express from 'express';
import prodsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import ProductManager from './ProductManager.js';


const PORT = 8080;
const app = express();

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')));

const productManager = new ProductManager();

export const io = new Server(serverExpress)

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    
    socket.on('nuevoProducto', async (nuevoProd) => {
        await productManager.addProduct(nuevoProd)
        const newProducts = await productManager.getProducts()
        socket.emit('prods', newProducts)
    })
})

app.use('/api/products', prodsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


