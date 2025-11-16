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
      <div className="min-h-screen bg-gradient-to-br from-[#e0f4f9] via-[#d4eef5] to-[#c8e8f1]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#67C6E3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-[#4FB3D9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#378BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <form onSubmit={handlePayment}>
            <img src="/images.png" alt="Logo" className="w-32 h-32 mb-4" />
            <h2 className="text-2xl font-semibold">
              Username:{" "}
              <span className="text-blue-400">
                {username ? username : "Not logged in"}
              </span>
            </h2>

            <br />
            <h2 className="text-2xl font-semibold">
              Patients Attended:{" "}
              <span className="text-blue-400">{count}</span>
            </h2>

            <br />
            <h2 className="text-2xl font-semibold">
              Credits Earned:{" "}
              <span className="text-blue-400">{credits}</span>
            </h2>

            <br />
            <h2 className="text-2xl font-semibold">
              Payment Due:{" "}
              <span className="text-blue-400">{payment}</span>
            </h2>

            <br />
            {payment > 0 && (
              <div>
                <button
                  type="submit"
                  disabled={sentRequest || statusPayment}
                  className={`px-5 py-2 text-white font-semibold rounded-xl transition-all duration-300 
                    ${
                      statusPayment
                        ? "bg-green-500 cursor-default shadow-lg animate-pulse"
                        : sentRequest
                        ? "bg-yellow-500 cursor-default shadow-lg animate-pulse"
                        : "bg-gradient-to-r from-[#67C6E3] to-[#4FB3D9] hover:shadow-lg hover:scale-105"
                    }`}
                >
                  {statusPayment
                    ? " Payment Approved"
                    : sentRequest
                    ? " Request Sent"
                    : " Request Payment"}
                </button>
              </div>
            )}
          </form>
          
             {statusPayment && (
            <button
              onClick={handleReset}
              className="mt-4 mr-10 px-5 py-2 text-white font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              Clear Payment
            </button>
          )}
          
         
        </div>
      </div>
    </>
  );
};

export default Account;
