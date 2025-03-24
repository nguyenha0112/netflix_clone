import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";



export const fetchFromTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: ENV_VARS.TMDB_API_KEY,
    },
  };
   console.log( options.headers.Authorization);
  const response = await axios.get(url,options);


   

  if(response.status !== 200){
    throw new Error("Failed to fetch data from TMDB API" + response.statusText);
  }
  
  return response.data;
};




