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

const InputField = ({ label, id, type = "text", placeholder, value, onChange, required }) => {
  const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-colors"
      />
    </div>
  );
};

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
                      aria-live="polite"
                      className={`flex items-center gap-2 text-xs ${
                        rule.test(password) ? "text-teal-600" : "text-gray-400"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          rule.test(password) ? "bg-teal-100" : "bg-gray-100"
                        }`}
                      >
                        {rule.test(password) ? (
                          <svg aria-hidden="true" className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gray-300 block"></span>
                        )}
                      </span>
                      <span className="sr-only">{rule.label} {rule.test(password) ? "requirement met" : "requirement not met"}</span>
                      <span aria-hidden="true">{rule.label}</span>
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
