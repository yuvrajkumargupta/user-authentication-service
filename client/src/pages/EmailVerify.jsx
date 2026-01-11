import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const EmailVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, user } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Resolve email safely
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else if (user?.email) {
      setEmail(user.email);
    } else {
      toast.error("Invalid access. Please login again.");
      navigate("/login");
    }
  }, [location, user, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error("Enter valid 6-digit OTP");
    }

    try {
      setLoading(true);

      console.log("OTP being sent:", otp); 

      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-email`,
        { otp },                          
        { withCredentials: true }         
      );

      if (data.success) {
        toast.success("Email verified successfully");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">

        <img
          src={assets.logo}
          alt="App Logo"
          className="w-28 mx-auto mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter OTP sent to <br />
          <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            className="w-full px-4 py-2 border rounded-md text-center tracking-widest"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-md"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default EmailVerify;
