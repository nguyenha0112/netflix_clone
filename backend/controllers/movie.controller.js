import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const movies = data.results; // Lấy toàn bộ danh sách phim
    res.json({ success: true, content: movies }); // Trả về danh sách phim
  } catch (error) {
    console.log("Error on getTrendingMovies", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function getTrendingMovie(req, res) {
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
  //tao ra api de lay trailer
  const { id } = req.params;
  try {
    //goi api
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    //lay trailer
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("status code 404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getmovietdetails(req, res) {
  //tao ra api de lay thong tin chi tiet cua phim
  const { id } = req.params;
  try {
    //goi api
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-U`
    );
    //lay thong tin chi tiet cua phim
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("status code 404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getmoviesimilar(req, res) {
  //tao ra api de lay phim khac
  const { id } = req.params;
  try {
    //goi api
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    //lay phim khac
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("status code 404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMoviesByCategory(req, res) {
const { category } = req.params;
//tao ra api de lay phim theo the loai
  try {
    //goi api
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    //lay phim theo the loai
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("status code 404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: error.message });
  }
}
