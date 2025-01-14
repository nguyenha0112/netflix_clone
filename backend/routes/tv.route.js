import express from 'express';
import { getTrendingTV, getTVtrailer,getTVtdetails,getTVimilar,getTVByCategory } from '../controllers/tv.controller.js';


const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTVtrailer);
router.get("/:id/details", getTVtdetails);
router.get("/:id/similar", getTVimilar);
//router lay phim theo the loai
router.get("/:category",getTVByCategory); 



export default router;
