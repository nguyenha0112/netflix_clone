import express from 'express';
import { getmovietrailer, getTrendingMovies,getmovietdetails,getmoviesimilar,getMoviesByCategory} from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/:id/trailers", getmovietrailer);
router.get("/:id/details", getmovietdetails);
router.get("/:id/similar", getmoviesimilar);
//router lay phim theo the loai
router.get("/:category",getMoviesByCategory); 



export default router;
