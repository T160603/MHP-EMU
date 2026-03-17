import React, { useState } from 'react';
import { User, Lock, RotateCcw, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Added Link here

const LoginPage = () => {
  const navigate = useNavigate();
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // GOOGLE APPS Script URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6t_GgXp2VuNQSyYWit4w5OeTtgNbabCzkiHyMy_o5DVIVs_tJMPyeccOTrGrE9GM/exec";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!eid || !password) {
      setError("Please enter both EID and Password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${SCRIPT_URL}?eid=${eid}&password=${password}`);
      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEID", result.user.eid);
        localStorage.setItem("userName", result.user.name);
        localStorage.setItem("userPosition", result.user.position);
        localStorage.setItem("userPhoto", result.user.photo);
        localStorage.setItem("userEmail", result.user.email);
        localStorage.setItem("userphone", result.user.phone);

        navigate("/");
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#011a11] relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg width="100%" height="100%">
          <circle cx="10%" cy="20%" r="1.5" fill="#4ade80" className="animate-pulse" />
          <circle cx="30%" cy="40%" r="2" fill="#4ade80" />
          <circle cx="70%" cy="15%" r="1.5" fill="#4ade80" />
          <circle cx="85%" cy="60%" r="2" fill="#4ade80" className="animate-pulse" />
          <circle cx="20%" cy="80%" r="1" fill="#4ade80" />
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#4ade80" strokeWidth="0.5" opacity="0.3" />
          <line x1="70%" y1="15%" x2="85%" y2="60%" stroke="#4ade80" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md z-10 mx-4 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="h-20 w-auto mb-4">
             <img 
              src='https://i.ibb.co/PsW5NV83/logo.png"  border="0"' 
              alt="DrukGreen Logo" 
              className="h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#1e4d3a] tracking-tight">
            MHP, EMU Checklist 
          </h1>
        </div>

        <form className="w-full space-y-5" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <User size={18} strokeWidth={2} />
            </span>
            <input
              type="text"
              placeholder="Username (EID)"
              disabled={isLoading}
              value={eid}
              onChange={(e) => setEid(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#f9fafb] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <Lock size={18} strokeWidth={2} />
            </span>
            <input
              type="password"
              placeholder="Password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#f9fafb] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-lg shadow-lg transform active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-8">
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;