import express from 'express';
import User from '../models/User.js'
import { sendLink,resetPassword } from '../controllers/passwordController.js';
const passRouter=express.Router();

passRouter.post('/reset-password/:id/:token',resetPassword);
passRouter.post('/',sendLink);


export default passRouter;