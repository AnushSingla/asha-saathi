import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [closedBoxes, setClosedBoxes] = useState([]);
  const [upi, setUpi] = useState("");

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment`);
      const data = await res.json();
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id, amount) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" })
      });

      const data = await res.json();
      if (data.status === "approved") {
        setResponse(true);
        fetchRequests();

        
       if (upi) {
  const paytmUrl = `paytmmp://pay?pa=${upi}&pn=ASHA%20Worker&am=${amount}&cu=INR`;
  const webFallback = `https://paytm.com/upi-transfer?pa=${upi}&pn=ASHA%20Worker&am=${amount}&cu=INR`;

  
  window.location.href = paytmUrl;

  setTimeout(() => {
    window.open(webFallback, "_blank");
  }, 1000);
} else {
  alert("Please enter a valid UPI ID first!");
}

      }
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  useEffect(() => {
    const hidden = JSON.parse(localStorage.getItem("closedBoxes")) || [];
    setClosedBoxes(hidden);
  }, []);

  const handleCloseBox = (id) => {
    setClosedBoxes((prev) => {
      const updated = [...prev, id];
      localStorage.setItem("closedBoxes", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[#e0f4f9] via-[#d4eef5] to-[#c8e8f1] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#67C6E3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-[#4FB3D9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#378BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto p-8 space-y-8">
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a5f7a] via-[#67C6E3] to-[#1a5f7a]">
              Admin Payment Requests
            </h1>
            <p className="text-gray-700 mt-2">
              Approve or manage all incoming payment requests from users
            </p>
          </div>

          {isLoading && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#67C6E3] to-[#5BB8D8] rounded-2xl animate-pulse mb-4 shadow-lg">
                <div className="w-8 h-8 bg-white/90 rounded-xl"></div>
              </div>
              <p className="text-[#67C6E3] font-semibold">Loading requests...</p>
            </div>
          )}

          {!isLoading && requests.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {requests.map((req) =>
                closedBoxes.includes(req._id) ? null : (
                  <div
                    key={req._id}
                    className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/50 transition-all duration-300 hover:shadow-[0_15px_60px_rgba(103,198,227,0.3)] relative"
                  >
                    <button
                      onClick={() => handleCloseBox(req._id)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
                    >
                      ✕
                    </button>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Request from {req.username}
                    </h3>
                    <p className="text-sm text-gray-600">Credits: {req.credits}</p>
                    <p className="text-gray-700 mb-4">Amount: ₹{req.payment}</p>

                    

                    {req.status === "approved" ? (
                      <button
                        disabled
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white w-full px-5 py-3 font-semibold rounded-xl"
                      >
                        Approved
                      </button>
                    ) : (
                      <><div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter UPI ID:
                          </label>
                          <input
                            type="text"
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                            placeholder="asha@upi"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#67C6E3] outline-none" />
                        </div><button
                          onClick={() => handleApprove(req._id, req.payment)}
                          className="bg-gradient-to-r from-[#67C6E3] to-[#4FB3D9] text-white hover:shadow-lg hover:scale-105 w-full px-5 py-3 font-semibold rounded-xl"
                        >
                            Approve & Pay
                          </button></>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            !isLoading && (
              <p className="text-center text-gray-700 text-lg font-medium">
                No pending payment requests.
              </p>
            )
          )}
        </div>

        <style jsx>{`
          @keyframes blob {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
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
        `}</style>
      </div>
    </>
  );
};

export default Admin;
