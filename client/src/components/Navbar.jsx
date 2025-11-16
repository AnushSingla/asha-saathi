

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("count");
    navigate("/login");
  };
  const handleAdmin = ()=>{
    navigate("/adminl")
  };

  return (
    <nav className="bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#67C6E3] to-[#5BB8D8] rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white/90 rounded-lg"></div>
              </div>
            </div>
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a5f7a] to-[#67C6E3]">
              Asha Saathi
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-8">
            <button
              onClick={() => navigate("/account")}
              className="font-semibold text-gray-700 hover:text-[#67C6E3] transition-colors px-3 py-2 relative group"
            >
              My Account
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
            <button
              onClick={() => navigate("/home")}
              className="font-semibold text-gray-700 hover:text-[#67C6E3] transition-colors px-3 py-2 relative group"
            >
              Report Summarizer
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
            <button className="font-semibold text-gray-700 hover:text-[#67C6E3] transition-colors px-3 py-2 relative group">
              Medication
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-gradient-to-r from-[#67C6E3] to-[#4FB3D9] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Logout
            </button>
            
          </div>
           <button
              onClick={handleAdmin}
              className="px-5 py-2 bg-gradient-to-r from-[#67C6E3] to-[#4FB3D9] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Admin
            </button>

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
