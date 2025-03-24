import express from 'express';
import cookieParser from 'cookie-parser';

// import route
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

// import cac ham khai bao bien
import { connectDB } from './config/bd.js';
import { ENV_VARS } from './config/envVars.js';
import { protectRoute } from './middleware/protectRoute.js';


const app = express();
const PORT = ENV_VARS.PORT;
// tao bien moi truong

// console.log("MONGO_URI: ", process.env.MONGO_URI);
app.use(cookieParser());
app.use(express.json()); 


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies",protectRoute,movieRoutes);
app.use("/api/v1/tvs", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database", err);
});

