import { Router } from 'express';
import userRouter from './users.routes.js';
import sessionsRouter from './sessions.routes.js';
import prodsRouter from './products.routes.js';
import cartRouter from './cart.routes.js';
import viewsRouter from './views.routes.js';

const router = Router();

router.use('/api/users', userRouter);
router.use('/api/products', prodsRouter);
router.use('/api/cart', cartRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/', viewsRouter);

export default router;
