import express from 'express';
import router from './movie.route';
import { SearchMovie, SearchPerson, SearchTVShow } from '../controllers/search.controller.js';


const router = express.Router();

router.get("/person/:query", SearchPerson);
router.get("/movies/:query", SearchMovie);
router.get("/tvs/:query", SearchTVShow);

export default router;