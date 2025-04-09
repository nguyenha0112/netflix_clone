import React from "react";
import { Link , useNavigate } from "react-router-dom";
import images from "../../assets/image.js";

import { useState } from "react";

const Authscreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // sử dụng để điều hướng sang route 
  const HandleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`); //truyền giá trị email lên địa chỉ urlurl
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={images.netflixLogo} alt="Logo" className="w-52" />
        </Link>
        <Link to="/login" className="btn btn-ghost normal-case text-xl ">
          <button className="px-4 py-2 rounded-4xl bg-white border border-gray-500 cursor-pointer hover:opacity-60 font-medium ">
            Sign in
          </button>
        </Link>
      </header>

      {/* section */}

      <div className="flex flex-col justify-center items-center text-cente py-40 text-white max-w-6xl mx-auto">
        <h3 className="text-6xl font-bold">
          Unlimited movies, TV shows, and more
        </h3>
        <p className="text-3xl my-4 font-medium">
          Starts at 70,000 ₫. Cancel anytime.
        </p>
        <p className="text-2xl mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form className="flex flex-col md:flex-row gap-4 w-1/2 justify-center items-center" onSubmit={HandleFormSubmit}>
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
              <source
                src={images.video_hero}
                type="video/x-m4v"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authscreen;
