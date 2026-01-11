import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center text-center mt-20 px-4 text-gray-800">
      <img
        src={assets.header_img}
        alt="Profile"
        className="w-36 h-36 rounded-full mb-6 object-cover"
      />

      <h1 className="flex items-center gap-2 text-3xl font-bold mb-2">
        Hi {user?.name || "Developer"}!
        <img
          className="w-8 h-8"
          src={assets.hand_wave}
          alt="Waving hand"
        />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to Our Platform
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        Secure authentication system built with MERN stack and modern best practices.
      </p>

      <button className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default Header;
