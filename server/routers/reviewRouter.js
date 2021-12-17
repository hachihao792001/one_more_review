import express from 'express';
import Review from '../models/Review.js';
import { isAuth} from '../middleware/auth.js';
import { getReview,createReview,updateReview,deleteReview } from '../controllers/ReviewController.js';
const reviewRouter=express.Router();


reviewRouter.get('/:id',isAuth,getReview);
reviewRouter.post('/',isAuth,createReview);
reviewRouter.put('/:id',isAuth,updateReview);
reviewRouter.delete('/:id',isAuth,deleteReview);

export default reviewRouter;

