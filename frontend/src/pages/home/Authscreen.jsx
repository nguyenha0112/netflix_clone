import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/image.js";
import { useMovieStore } from "../../stores/movie.js";

import { useState } from "react";

const Authscreen = () => {
  const [email, setEmail] = useState("");
  const { trendingMovies, fetchTrendingMovies, isLoading, error } =
    useMovieStore();
  const navigate = useNavigate(); // sử dụng để điều hướng sang route
  const [language, setLanguage] = useState("vi"); // Mặc định là tiếng Việt
  const [currentIndex, setCurrentIndex] = useState(0); // Index của phim đầu tiên đang hiển thị

  useEffect(() => {
    fetchTrendingMovies(); // Gọi API khi component được mount
  }, [fetchTrendingMovies]);

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`); //truyền giá trị email lên địa chỉ urlurl
  };
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    console.log("Ngôn ngữ đã chọn:", e.target.value); // Xử lý logic thay đổi ngôn ngữ tại đây
  };
  const handleNext = () => {
    if (currentIndex + 1 < trendingMovies.length) {
      setCurrentIndex(currentIndex + 1); // Dịch sang phải 1 phim
    }
  };

  // Hàm xử lý khi nhấn nút mũi tên trái
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Dịch sang trái 1 phim
    }
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={images.netflixLogo} alt="Logo" className="w-52" />
        </Link>
        <div className="flex gap-4 items-center">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="text-white font-medium bg-transparent border border-gray-500 rounded-3xl px-2 py-2  cursor-pointer hover:opacity-80"
          >
            <option className="text-black" value="vi">
              Tiếng Việt
            </option>
            <option className="text-black" value="en">
              English
            </option>
          </select>
          <Link to="/login" className="btn btn-ghost normal-case text-xs ">
            <button className="px-4 py-2 rounded-4xl bg-white border border-gray-500 cursor-pointer hover:opacity-60 font-medium ">
              Sign in
            </button>
          </Link>
        </div>
      </header>

      {/* section */}

      <div className="flex flex-col justify-center items-center text-cente py-40 text-white max-w-6xl mx-auto">
        <h3 className=" font-bold md:text-4xl lg:text-6xl">
          Unlimited movies, TV shows, and more
        </h3>
        <p className="text-3xl my-4 font-medium">
          Starts at 70,000 ₫. Cancel anytime.
        </p>
        <p className="text-2xl mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2 justify-center items-center"
          onSubmit={HandleFormSubmit}
        >
          <input
            type="email"
            placeholder="you@gmail.com"
            className=" w-1/2 p-2  px-4 mt-1 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className=" w-1/3 bg-red-600 text-white py-1 rounded-full lg:px-4 md:py-2  hover:bg-red-700 transition duration-400 cursor-pointer flex justify-center items-center">
            <Link to="/signup">Get Started</Link>
          </button>
        </form>
      </div>

      {/* separatorr */}
      <div className="h-2 w-full bg-[#232323]"></div>
      {/* section1 */}
      <div className="p-10 bg-black text-white flex justify-center items-center">
        <div className=" flex max-w-6x1 items-center justify-center md:flex-row flex-col px4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray player. and more
            </p>
          </div>
          <div className="flex-1 relative">
            <img src={images.tv} alt="tv" className="mt-4 z-20 " />
            <video
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              autoPlay="true"
            >
              <source src={images.video_hero} type="video/x-m4v" />
            </video>
          </div>
        </div>
      </div>
      {/* section2 */}
      <div className="p-10 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Hiện Đang Thịnh Hành</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : trendingMovies.length > 0 ? (
            <div className="relative shadow-2xs">
              {/* Nút mũi tên trái */}
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-600/30 text-white py-8 px-3 cursor-pointer rounded-full z-10 hover:bg-gray-600/50"
                >
                 <i class="fa-solid fa-arrow-left"></i>
                </button>
              )}

              {/* Danh sách phim */}
              <div className="flex overflow-hidden">
                <div
                  className="flex transition-transform duration-300"
                  style={{
                    transform: `translateX(-${currentIndex * 200}px)`, // Dịch chuyển theo chiều ngang
                  }}
                >
                  {trendingMovies.map((movie, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 mr-4 relative group cursor-pointer"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-lg transition-transform transform "
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-4">
                        <p className="text-white text-sm">{movie.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút mũi tên phải */}
              {currentIndex + 6 < trendingMovies.length && (
                <button
                  onClick={handleNext}
                  className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-600/30 text-white py-8 px-3 cursor-pointer rounded-full z-10 hover:bg-gray-600/50"
                >
                 <i class="fa-solid fa-arrow-right"></i>
                </button>
              )}
            </div>
          ) : (
            <p>No trending movies available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authscreen;
