import axios from "axios";
import { create } from "zustand";

export const useMovieStore = create((set) => ({
  trendingMovies: [], // State để lưu danh sách phim thịnh hành
  isLoading: false, // Trạng thái tải dữ liệu
  error: null, // Trạng thái lỗi

  fetchTrendingMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/v1/movies/trendings", {
        withCredentials: true, // Đảm bảo gửi cookie nếu cần
      });
      const movies = response.data.content;
      set({ trendingMovies: movies, isLoading: false });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      set({ error: error.response?.data?.message || "Failed to fetch movies", isLoading: false });
    }
  },
}));