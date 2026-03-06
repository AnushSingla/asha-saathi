import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const passwordRules = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw) => /[0-9]/.test(pw) },
  { label: "One special character (!@#$%^&*)", test: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw) },
];

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

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isPasswordStrong = passwordRules.every((rule) => rule.test(password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong) {
      setPasswordTouched(true);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.role || "user");
        alert("Registration successful!");
        navigate("/home");
      } else {
        alert(data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      alert("Google Sign-In is unavailable: Firebase is not configured.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("username", data.user?.username || data.username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role || "user");
        alert("Google Registration successful!");
        navigate("/home");
      } else {
        alert(data.message || "Google Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Something went wrong with Google Sign-In.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-base font-bold text-gray-900">Asha Saathi</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Create an account</h1>
            <p className="text-sm text-gray-400">Join Asha Saathi to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Full name"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password with strength indicators */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordTouched(true); }}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-colors"
              />
              {passwordTouched && (
                <ul className="mt-2.5 space-y-1.5 pl-0.5">
                  {passwordRules.map((rule, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 text-xs ${
                        rule.test(password) ? "text-teal-600" : "text-gray-400"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        rule.test(password) ? "bg-teal-100" : "bg-gray-100"
                      }`}>
                        {rule.test(password) ? (
                          <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-gray-300 block"></span>
                        )}
                      </span>
                      {rule.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or continue with</span></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2.5 text-sm font-medium text-gray-700 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
            Sign up with Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-teal-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>

          <p className="text-center text-xs text-gray-400 mt-2">
            Admin?{" "}
            <button onClick={() => navigate("/adminr")} className="text-teal-600 font-semibold hover:underline">
              Register as admin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong) {
      setPasswordTouched(true);
      return;
    }
    setIsLoading(true);
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.role || "user");
        alert("Registration successful!");
        navigate("/home");
      } else {
        alert(data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      alert("Google Sign-In is unavailable: Firebase is not configured.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("username", data.user?.username || data.username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role || "user");
        alert("Google Registration successful!");
        navigate("/home");
      } else {
        alert(data.message || "Google Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Something went wrong with Google Sign-In.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#e0f4f9] via-[#d4eef5] to-[#c8e8f1] p-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#67C6E3] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#4FB3D9] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#378BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main card with 3D effect */}
      <div className="relative w-full max-w-md transform-gpu perspective-1000">
        <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/50 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_20px_80px_rgba(103,198,227,0.4)]"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 30px 60px -15px rgba(103, 198, 227, 0.4), inset 0 -1px 5px 0 rgba(255, 255, 255, 0.2)',
            transform: 'translateZ(0)',
          }}>

          {/* Glow effect on top */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#67C6E3]/80 to-transparent"></div>

          {/* Header section with 3D icon */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 mb-4 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#67C6E3] to-[#4FB3D9] rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FB3D9] to-[#378BA4] rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 shadow-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-[#67C6E3] to-[#5BB8D8] rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
                <div className="w-8 h-8 bg-white/90 rounded-xl shadow-inner"></div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-[#1a5f7a] via-[#67C6E3] to-[#1a5f7a]">
              Create Account
            </h1>
            <p className="text-gray-700 text-sm tracking-wide">Join Asha Saathi today</p>
          </div>

          {/* Form section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <input

                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl 
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

            {/* Email input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl 
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

            {/* Password input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordTouched(true); }}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl 
                           text-gray-800 placeholder-gray-400 
                           focus:border-[#67C6E3] focus:bg-white focus:outline-none 
                           transition-all duration-300 
                           shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]
                           hover:bg-white hover:border-gray-300"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#67C6E3]/0 via-[#67C6E3]/10 to-[#67C6E3]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {passwordTouched && (
                <ul className="mt-2 ml-1 space-y-1">
                  {passwordRules.map((rule, i) => (
                    <li key={i} aria-label={`${rule.label}: ${rule.test(password) ? "requirement met" : "requirement not met"}`} className={`text-xs flex items-center gap-1.5 ${rule.test(password) ? "text-green-600" : "text-red-500"}`}>
                      <span aria-hidden="true">{rule.test(password) ? "✓" : "✗"}</span>
                      {rule.label}
                    </li>
                  ))}
                </ul>
              )}
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
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </span>
            </button>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-4 px-6 mt-4 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 group"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
              <span className="text-gray-700 font-semibold text-lg">Sign up with Google</span>
            </button>
          </form>

          {/* Footer section */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#67C6E3] hover:text-[#5BB8D8] font-semibold transition-colors relative group inline-block"
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            </p>
            <button
              onClick={() => navigate("/adminr")}
              className="text-[#67C6E3] hover:text-[#5BB8D8] font-semibold transition-colors relative group inline-block"
            >
              <span className="relative z-10">Switch to Admin</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
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

export default Register;
