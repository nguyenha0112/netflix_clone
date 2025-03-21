import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function SearchPerson(req, res) {
  const { query } = req.params; //get query from request
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    ); //fetch data from TMDB

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: { searchHistory:{
        person: response.results[0].id,
        Image: response.results[0].profile_path,
        title: response.results[0].name,
        searchTyo: "person",
        createAt: new Date(),
      } },
    }); //update search history

    res.status(200).json(response.results); //return data to client


  } catch (error) {
    console.log(" error on SearchPerson", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function SearchMovie(req, res) {
    const { query } = req.params; //get query from request
    try {
      const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      ); //fetch data from TMDB
  
      if (response.results.length === 0) {
        return res.status(404).send(null);
      }
  
      await User.findByIdAndUpdate(req.user._id, {
        $push: { searchHistory:{
          person: response.results[0].id,
          Image: response.results[0].profile_path,
          title: response.results[0].name,
          searchTyo: "movie",
          createAt: new Date(),
        } },
      }); //update search history
  
      res.status(200).json(response.results); //return data to client
  
  
    } catch (error) {
     console.log(" error on SearchMovie", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
}
export async function SearchTVShow(req, res) {
  const { query } = req.params; //get query from request
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    ); //fetch data from TMDB

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      // sử dụng push để thêm phần tử vào mảng
      // searchHistory của user
      $push: { searchHistory:{
        person: response.results[0].id,
        Image: response.results[0].profile_path,
        title: response.results[0].name,
        searchTyo: "movie",
        createAt: new Date(),
      } },
    }); //update search history

    res.status(200).json(response.results); //return data to client


  } catch (error) {
   console.log(" error on SearchMovie", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
