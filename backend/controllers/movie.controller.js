import { fetchFromTMDB } from "../services/tmdb.service.js";


export async function getTrendingMovies(req, res){
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
       const ramdomovie =   data.results[Math.floor(Math.random() * data.results?.length)];
       res.json({ success: true, content: ramdomovie });

    } catch (error) {
        console.log("Error on getTrendingMovie", error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}