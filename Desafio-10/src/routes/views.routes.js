import { Router } from 'express';
import passport from 'passport';
import { passportError, authorization } from '../utils/messagesError.js';
import { checkCookie } from '../controllers/views.controllers.js';
import { getHome, getRealtimeProducts, getRealtimeChat, getUserRegister, getUserLogin, getuserProfile } from '../controllers/views.controllers.js';

const viewsRouter = Router();

viewsRouter.get('/home', getHome);
viewsRouter.get('/realtimeproducts', passportError('jwt'), authorization('admin'), getRealtimeProducts);
viewsRouter.get('/realtimechat', passportError('jwt'), authorization('user'), getRealtimeChat);
viewsRouter.get('/userregister', checkCookie, getUserRegister);
viewsRouter.get('/userlogin', checkCookie, getUserLogin);
viewsRouter.get('/userprofile', passport.authenticate('jwt', { session: false, failureRedirect: '/userlogin' }), getuserProfile);

export default viewsRouter;
