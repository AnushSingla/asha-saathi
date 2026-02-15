import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);
  const [credits, setCredits] = useState(0);
  const [payment, setPayment] = useState(0);
  const [sentRequest, setSentRequest] = useState(false);
  const [statusPayment, setStatusPayment] = useState(false);

  // ✅ Payment request to Admin
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, count, credits, payment }),
      });

      if (response.ok) {
        setSentRequest(true);
        alert("Payment request sent to Admin!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        alert("Payment request failed");
      }
    } catch (error) {
      console.error("Payment Request Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // ✅ Clear payment + reset counts but keep username
  const handleReset = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Reset successful:", data);

        // Reset all counters
        setCount(0);
        setCredits(0);
        setPayment(0);

        // Reset payment request states
        setSentRequest(false);
        setStatusPayment(false);

        // Clear localStorage count
        localStorage.removeItem(`count_${username}`);
        localStorage.setItem(`count_${username}`, 0);

        alert("Payment cleared! You can start new summaries now.");
      } else {
        console.warn("Reset failed:", data);
        alert(`Payment reset failed: ${data.message || data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error resetting payment:", err);
      alert("Network or server error while resetting payment");
    }
  };

  // ✅ Load username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername !== "undefined") {
      setUsername(storedUsername);
    }
  }, []);

  // ✅ Load saved count/credits/payment from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      const savedCount = localStorage.getItem(`count_${savedUsername}`);
      if (savedCount) {
        setCount(Number(savedCount));
        const calcCredits = Number(savedCount) * 20;
        const calcPayment = Number(savedCount) * 2000;
        setCredits(calcCredits);
        setPayment(calcPayment);
      }
    }
  }, []);

  // ✅ Check if payment is pending
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!username) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment`);
        const data = await res.json();

        const userPayment = data.find((p) => p.username === username);
        if (userPayment && userPayment.status === "pending") {
          setSentRequest(true);
        } else {
          setSentRequest(false);
        }
      } catch (err) {
        console.error("Error fetching payment status:", err);
      }
    };

    checkPaymentStatus();
  }, [username]);

  
  useEffect(() => {
    const checkStatus = async () => {
      if (!username) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment`);
        const data = await res.json();

        const userPayment = data.find((p) => p.username === username);
        if (userPayment && userPayment.status === "approved") {
          setStatusPayment(true);
        } else {
          setStatusPayment(false);
        }
      } catch (err) {
        console.error("Error fetching payment status:", err);
      }
    };

    checkStatus();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#e0f4f9] via-[#d4eef5] to-[#c8e8f1] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#67C6E3] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-[#4FB3D9] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#378BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          {/* Main Card Container */}
          <div className="relative w-full max-w-lg transform-gpu perspective-1000">
            <div 
              className="relative bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 transform transition-all duration-500 hover:shadow-[0_20px_80px_rgba(103,198,227,0.4)]"
              style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 30px 60px -15px rgba(103, 198, 227, 0.4), inset 0 -1px 5px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Glow effect on top */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#67C6E3]/80 to-transparent"></div>

              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="mx-auto w-24 h-24 mb-6 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#67C6E3] to-[#4FB3D9] rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4FB3D9] to-[#378BA4] rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 shadow-lg"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-[#67C6E3] to-[#5BB8D8] rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110 overflow-hidden">
                    <img src="/images.png" alt="Logo" className="w-16 h-16 object-contain" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-[#1a5f7a] via-[#67C6E3] to-[#1a5f7a]">
                  My Account
                </h1>
                <p className="text-gray-600 text-sm tracking-wide">
                  Welcome back, <span className="font-semibold text-[#378BA4]">{username || "Guest"}</span>
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Patients Attended Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#67C6E3] to-[#4FB3D9] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm font-medium">Patients Attended</span>
                  </div>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#378BA4] to-[#67C6E3]">{count}</p>
                </div>

                {/* Credits Earned Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4FB3D9] to-[#378BA4] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm font-medium">Credits Earned</span>
                  </div>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#378BA4] to-[#67C6E3]">{credits}</p>
                </div>
              </div>

              {/* Payment Due Section */}
              <div className="bg-gradient-to-r from-[#67C6E3]/20 to-[#4FB3D9]/20 rounded-2xl p-6 border border-[#67C6E3]/30 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Payment Due</p>
                    <p className="text-4xl font-bold text-[#1a5f7a]">
                      ₹{payment.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#67C6E3] to-[#378BA4] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <form onSubmit={handlePayment}>
                {payment > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={sentRequest || statusPayment}
                      className={`flex-1 px-6 py-4 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
                        ${
                          statusPayment
                            ? "bg-gradient-to-r from-green-500 to-green-600 cursor-default"
                            : sentRequest
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 cursor-default"
                            : "bg-gradient-to-r from-[#67C6E3] to-[#4FB3D9] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                    >
                      {statusPayment ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Payment Approved
                        </>
                      ) : sentRequest ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Request Pending
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Request Payment
                        </>
                      )}
                    </button>
                    
                    {statusPayment && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-4 text-white font-semibold rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Clear Payment
                      </button>
                    )}
                  </div>
                )}

                {payment === 0 && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">No pending payments</p>
                    <p className="text-gray-500 text-sm mt-1">Start attending patients to earn credits!</p>
                  </div>
                )}
              </form>
            </div>

            {/* Bottom decoration */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-transparent via-[#67C6E3]/20 to-transparent blur-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
