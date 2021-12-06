import express from 'express';


import { isAuth,isAdmin } from '../middleware/auth.js';
import { createFilm,getFilm,updateFilm,deleteFilm,getAllFilms } from '../controllers/FilmController.js';
const filmRouter=express.Router();

// filmRouter.put('/update',updateAll)
filmRouter.get('/films',isAuth,getAllFilms);
filmRouter.post('/',isAuth,isAdmin,createFilm);
filmRouter.get('/:id',isAuth,getFilm);
filmRouter.put('/:id',isAuth,isAdmin,updateFilm);
filmRouter.delete('/:id',isAuth,isAdmin,deleteFilm);


export default filmRouter;