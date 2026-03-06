import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-colors"
    />
  </div>
);

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        if (data.role !== "admin") {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          alert("This account does not have admin access.");
          return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role || "user");
        navigate("/admin");
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div>
            <span className="text-base font-bold text-gray-900">Asha Saathi</span>
            <span className="ml-2 text-xs text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-full">Admin</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Admin sign in</h1>
            <p className="text-sm text-gray-400">Sign in with your admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email address"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don&#39;t have an admin account?{" "}
            <button onClick={() => navigate("/adminr")} className="text-teal-600 font-semibold hover:underline">
              Create one
            </button>
          </p>

          <p className="text-center text-xs text-gray-400 mt-2">
            <button onClick={() => navigate("/login")} className="text-gray-500 hover:underline">
              ← Back to user login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
