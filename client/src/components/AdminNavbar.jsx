

import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("count");
    localStorage.removeItem("role");
    navigate("/adminl");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/admin")}>
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 tracking-tight">Asha Saathi</span>
              <span className="ml-2 text-xs text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-full">Admin</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => navigate("/asha")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Asha Info
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Pending Payments
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              Messages
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
