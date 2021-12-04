import express from 'express';


import { isAuth,isAdmin } from '../middleware/auth.js';
import { createFilm,getFilm,updateFilm,deleteFilm } from '../controllers/FilmController.js';
const filmRouter=express.Router();

// filmRouter.put('/update',updateAll)
filmRouter.post('/',isAuth,isAdmin,createFilm);
filmRouter.get('/:id',isAuth,getFilm);
filmRouter.put('/:id',isAuth,isAdmin,updateFilm);
filmRouter.delete('/:id',isAuth,isAdmin,deleteFilm);
filmRouter.get('/phim-bo/:country',isAuth,isAdmin,deleteFilm);

export default filmRouter;