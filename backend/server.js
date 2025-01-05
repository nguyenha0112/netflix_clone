import express from 'express';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import { connectDB } from './config/bd.js';
import { ENV_VARS } from './config/envVars.js';

const app = express();
const PORT = ENV_VARS.PORT;

console.log("MONGO_URI: ", process.env.MONGO_URI);
app.use(express.json()); // will allow us to parse incoming json data
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database", err);
});

