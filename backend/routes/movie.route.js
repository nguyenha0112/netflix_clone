import express from 'express';
import { getmovietrailer, getTrendingMovies } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/:id/trailers", getmovietrailer);


export default router;
