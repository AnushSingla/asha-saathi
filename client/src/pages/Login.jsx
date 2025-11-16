import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[username,setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username",data.username);
        setUsername(data.username);
        navigate("/home");
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
        console.error("Login Error:", data);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#e0f4f9] via-[#d4eef5] to-[#c8e8f1] p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#67C6E3] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#4FB3D9] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#378BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main card with 3D effect */}
      <div className="relative w-full max-w-md transform-gpu perspective-1000">
        <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_80px_rgba(103,198,227,0.4)]"
             style={{
               boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 30px 60px -15px rgba(103, 198, 227, 0.4), inset 0 -1px 5px 0 rgba(255, 255, 255, 0.2)',
               transform: 'translateZ(0)',
             }}>
          
          {/* Glow effect on top */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#67C6E3]/80 to-transparent"></div>
          
          {/* Header section with 3D icon */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#67C6E3] to-[#4FB3D9] rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FB3D9] to-[#378BA4] rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 shadow-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-[#67C6E3] to-[#5BB8D8] rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
                <div className="w-10 h-10 bg-white/90 rounded-xl shadow-inner"></div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-[#1a5f7a] via-[#67C6E3] to-[#1a5f7a]">
              Welcome {username}
            </h1>
            <p className="text-gray-700 text-sm tracking-wide">Sign in to your Asha Saathi account</p>
          </div>
          
          {/* Form section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input with 3D effect */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl 
                           text-gray-800 placeholder-gray-400 
                           focus:border-[#67C6E3] focus:bg-white focus:outline-none 
                           transition-all duration-300 
                           shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]
                           hover:bg-white hover:border-gray-300"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#67C6E3]/0 via-[#67C6E3]/10 to-[#67C6E3]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Password input with 3D effect */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl 
                           text-gray-800 placeholder-gray-400 
                           focus:border-[#67C6E3] focus:bg-white focus:outline-none 
                           transition-all duration-300 
                           shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]
                           hover:bg-white hover:border-gray-300"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#67C6E3]/0 via-[#67C6E3]/10 to-[#67C6E3]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Submit button with 3D effect */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-4 px-6 mt-8 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Button background layers for 3D effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#67C6E3] to-[#4FB3D9] rounded-2xl transform transition-transform duration-200 group-hover:scale-[0.98] group-active:scale-95"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#5BB8D8] to-[#378BA4] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] rounded-2xl"></div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
              
              <span className="relative text-white font-bold text-lg tracking-wide drop-shadow-lg">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </span>
            </button>
          </form>
          
          {/* Footer section */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-[#67C6E3] hover:text-[#5BB8D8] font-semibold transition-colors relative group inline-block"
              >
                <span className="relative z-10">Create Account</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            </p>
          </div>
        </div>
        
        {/* Bottom shadow for 3D depth */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-[#67C6E3]/20 blur-2xl rounded-full"></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Login;
