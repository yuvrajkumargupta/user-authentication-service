import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, login } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //  Frontend validation
    if (!email || !password) {
      return toast.error("Email and password are required");
    }
    if (state === "Sign Up" && !name.trim()) {
      return toast.error("Name is required");
    }

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/register`,
          { name, email, password }
        );

        if (data.success) {
          login(data.user, data.token);
          toast.success("Account created successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          { email, password }
        );

        if (data.success) {
          login(data.user, data.token);

          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">

      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {state === "Sign Up" ? "Create your account" : "Login"}
        </h2>

        <p className="text-sm text-indigo-300 text-center mb-6 opacity-90">
          {state === "Sign Up"
            ? "Join us by creating your account"
            : "Login to continue to your dashboard"}
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">


          {/* Full Name (only Sign Up) */}
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] border border-transparent focus-within:border-indigo-400 transition">
              <img src={assets.person_icon} alt="" className="w-5 opacity-80" />
              <input onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent w-full outline-none text-white placeholder-indigo-300 text-sm"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] border border-transparent focus-within:border-indigo-400 transition">
            <img src={assets.mail_icon} alt="" className="w-5 opacity-80" />

            <input
              type="email"
              placeholder="Email address"
              required
              aria-label="Email address"
              autoComplete="email"
              inputMode="email"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
              className="bg-transparent w-full outline-none text-white placeholder-indigo-300 text-sm"
            />
          </div>


          {/* Password */}
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] border border-transparent focus-within:border-indigo-400 transition">
            <img src={assets.lock_icon} alt="" className="w-5 opacity-80" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              aria-label="Password"
              autoComplete={state === "Sign Up" ? "new-password" : "current-password"}
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="bg-transparent w-full outline-none text-white placeholder-indigo-300 text-sm"
            />

            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="text-xs text-indigo-300 cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>



          {/* Forgot password */}
          {state === "Login" && (
            <div
              onClick={() => navigate("/reset-password")}
              className="flex justify-end mt-2"
            >
              <span className="text-xs font-medium text-indigo-300 hover:text-indigo-400 cursor-pointer transition">
                Forgot password?
              </span>
            </div>
          )}


          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold tracking-wide hover:opacity-90 transition"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>



        </form>

        {/* Toggle */}
        <div className="mt-4 space-y-1 text-center">
          {state === "Sign Up" ? (
            <p className="text-sm text-indigo-300">
              Already have an account?
              <span
                role="button"
                tabIndex={0}
                aria-label="Switch to login"
                onClick={() => setState("Login")}
                onKeyDown={(e) => e.key === "Enter" && setState("Login")}
                className="ml-1 text-indigo-400 font-medium cursor-pointer hover:underline transition-colors duration-200"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-indigo-300">
              Don’t have an account?
              <span
                role="button"
                tabIndex={0}
                aria-label="Switch to sign up"
                onClick={() => setState("Sign Up")}
                onKeyDown={(e) => e.key === "Enter" && setState("Sign Up")}
                className="ml-1 text-indigo-400 font-medium cursor-pointer hover:underline transition-colors duration-200"
              >
                Sign up
              </span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
