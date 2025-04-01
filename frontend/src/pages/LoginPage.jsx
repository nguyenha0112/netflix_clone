import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import images from "../assets/image.js";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  }
  return (
       <div className=" h-screen w-full hero-bg">
      <header className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={images.netflixLogo} alt="Logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center  ">
        <div className="bg-black/60 rounded-lg shadpow-lg w-full max-w-md p-8 space-y-4">
          <h3 className="text-white text-2xl font-bold text-center">Sign Up</h3>
          <form className="space-y-4 ">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block" >
                Email
              </label>
              <input
                type="email"
                placeholder="you@gmail.com"
                className="w-full px-3 mt-1 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
           
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block" >
                Password
              </label>
              <input
                type="password"
                placeholder="*******"
                className="w-full px-3 mt-1 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-400 cursor-pointer">
              Login
             </button>
          </form>
          <div className="text-center text-gray-300 mt-4">
          Don't have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
           

          </div>
        </div>
      </div>
  
  )
}

export default LoginPage