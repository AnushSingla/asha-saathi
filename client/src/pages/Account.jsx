import React, { useCallback, useEffect, useState } from "react";
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
  const token = localStorage.getItem("token");

  const getAuthHeaders = () => {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  };

  const fetchPaymentStats = useCallback(async () => {
    if (!token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/stats`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setCount(Number(data.count || 0));
      setCredits(Number(data.credits || 0));
      setPayment(Number(data.payment || 0));
      setSentRequest(Boolean(data.hasPendingRequest));
      setStatusPayment(Boolean(data.hasApprovedRequest));
    } catch (err) {
      console.error("Error fetching payment stats:", err);
    }
  }, [token, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      const data = await response.json();

      if (response.ok) {
        await fetchPaymentStats();
        alert("Payment request sent to Admin!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (response.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(data.message || "Payment request failed");
      }
    } catch (error) {
      console.error("Payment Request Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleReset = async () => {
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });

      const data = await res.json();

      if (res.ok) {
        await fetchPaymentStats();
        alert("Payment cleared! You can start new summaries now.");
      } else if (res.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        console.warn("Reset failed:", data);
        alert(`Payment reset failed: ${data.message || data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error resetting payment:", err);
      alert("Network or server error while resetting payment");
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername !== "undefined") {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!username || !token) return;
    fetchPaymentStats();
  }, [username, token, fetchPaymentStats]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-6 py-12">

        {/* Profile header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-5 text-center">
          <div className="mx-auto w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Account</h1>
          <p className="text-sm text-gray-500">
            Welcome back,{" "}
            <span className="font-semibold text-teal-600">{username || "Guest"}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">Patients Attended</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{count}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">Credits Earned</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{credits}</p>
          </div>
        </div>

        {/* Payment Due */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Payment Due</p>
              <p className="text-3xl font-bold text-gray-900">₹{payment.toLocaleString("en-IN")}</p>
            </div>
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handlePayment}>
            {payment > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={sentRequest || statusPayment}
                  className={`flex-1 px-5 py-3 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2
                    ${
                      statusPayment
                        ? "bg-green-500 text-white cursor-default"
                        : sentRequest
                        ? "bg-amber-500 text-white cursor-default"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                >
                  {statusPayment ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Payment Approved
                    </>
                  ) : sentRequest ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Request Pending
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="px-5 py-3 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear Payment
                  </button>
                )}
              </div>
            )}

            {payment === 0 && (
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">No pending payments</p>
                <p className="text-xs text-gray-400 mt-1">Start attending patients to earn credits!</p>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Account;
