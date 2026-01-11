import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout, backendUrl } = useContext(AppContext);



  //verify email
 const sendVerificationOtp = async () => {
  try {
    axios.defaults.withCredentials = true;

    const { data } = await axios.post(
      `${backendUrl}/api/auth/send-verify-otp`,
      {},
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Verification OTP sent to your email");
      navigate("/verify-otp");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to send OTP");
  }
};




  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        src={assets.logo}
        alt="App Logo"
        className="w-28 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {user ? (
        <div className="flex items-center gap-4">
         <div className="w-8 h-8 flex justify-center items-center 
                rounded-full bg-black text-white relative group cursor-pointer">
 {user?.name?.[0]?.toUpperCase()}


  <div
    className="absolute hidden group-hover:block top-8 right-0 z-10
               bg-white text-gray-800 rounded-lg shadow-lg
               min-w-[150px] border border-gray-200"
  >
    <ul className="list-none m-0 py-2 text-sm">
      {user && !user.isAccountVerify && (
  <li
  onClick={sendVerificationOtp}
  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
>
  Verify Email
</li>

)}
    
      <li
        onClick={logout}
        className="px-4 py-2 hover:bg-red-50 text-red-600
                   cursor-pointer transition"
      >
        Logout
      </li>

    </ul>
  </div>
</div>

        </div>
      ) : (
        //  GUEST STATE
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 
                     rounded-full px-6 py-2 text-gray-800 
                     hover:bg-gray-100 transition-all"
        >
          Login
          <img src={assets.arrow_icon} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
