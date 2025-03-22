import express from 'express';
import { getSearchHistory, removeItemFromSearchHistory, SearchMovie, SearchPerson, SearchTVShow } from '../controllers/search.controller.js';


const router = express.Router();

router.get("/person/:query", SearchPerson);
router.get("/movie/:query", SearchMovie);
router.get("/tv/:query", SearchTVShow);

router.get("/history", getSearchHistory); //get search history

router.delete("/history/:id", removeItemFromSearchHistory); //delete item from search history

export default router;