import React, { useState } from "react";
import { fakeAccount } from "../fakeAccount";
import { useNavigate } from "react-router-dom";
import { CircleX, Eye, EyeClosed, EyeOff, TrashIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("DummyName");
  const [password, setPassword] = useState("DummyPass");
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const generateToken = (username) => {
    const expiry = Date.now() + 5 * 60 * 1000; 
    return btoa(JSON.stringify({ username, expiry }));
  };

  const handleLogin = () => {
    const user = fakeAccount.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const token = generateToken(user.username);
      localStorage.setItem("token", token);
      setAuthError(false);
      navigate("/");
    } else {
      setAuthError(true);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-300 via-cyan-50 to-red-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center shadow-sm">
            <span className="text-gray-500 font-extrabold">Z</span>
          </div>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-700 to-pink-500">
            Zippee Assignment
          </h2>
        </div>

       

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Username</label>
<div className="flex relative w-full">
      <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setAuthError(false);
            }}
            className="w-full border border-gray-600 rounded-md py-2 px-3 mb-4 text-gray-800 outline-none"
          />
          <button onClick={() => setUsername("")} className="absolute right-3 top-1/2 hover:cursor-pointer hover:text-red-500 transition duration-300 transform -translate-y-5">
            <TrashIcon />
          </button>
</div>

          <label className="text-sm text-gray-700 mb-1">Password</label>
        <div className="flex w-full   relative">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAuthError(false);
            }}
            className="w-full border border-gray-600 rounded-md py-2 px-3 mb-6 text-gray-800 outline-none"
             
          />
             <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 hover:cursor-pointer hover:text-red-500 transition duration-300 top-1/2 transform -translate-y-6">
           {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        </div>
 {authError && (
          <p className="text-red-500 font-semibold mb-4">
            Invalid username or password
          </p>
        )}
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
