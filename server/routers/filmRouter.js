import express from "express";

import { isAuth, isAdmin } from "../middleware/auth.js";
import {
  createFilm,
  getFilm,
  updateFilm,
  deleteFilm,
  getAllFilms,
  getFilmByGenre,
} from "../controllers/FilmController.js";
const filmRouter = express.Router();

// filmRouter.put('/update',updateAll)
filmRouter.get("/films", isAuth, getAllFilms);
filmRouter.post("/", isAuth, isAdmin, createFilm);
filmRouter.get("/:id", isAuth, getFilm);
filmRouter.put("/:id", isAuth, isAdmin, updateFilm);
filmRouter.delete("/:id", isAuth, isAdmin, deleteFilm);
filmRouter.get("/genre/:arg", isAuth, getFilmByGenre);
//filmRouter.get("/type/:arg", isAuth, getFilmByType);
//filmRouter.get("/nation/:arg", isAuth, getFilmByNation);
//filmRouter.get("/year/:arg", isAuth, getFilmByYear);

export default filmRouter;
