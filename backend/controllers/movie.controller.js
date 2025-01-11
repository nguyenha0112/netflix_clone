import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    //ggoi api
    const ramdomovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: ramdomovie });
    // lay ket qua ngau nhien
  } catch (error) {
    console.log("Error on getTrendingMovie", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getmovietrailer(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
   if(error.message.includes('status code 404')){
    return res.status(404).send(null);
   }

    res.status(500).json({ success: false, message: error.message });
  }
}
