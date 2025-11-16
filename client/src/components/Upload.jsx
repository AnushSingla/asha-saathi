import { useState  } from "react";
import { useNavigate } from "react-router-dom";


const Upload = () => {
  const [rawtext, setRawText] = useState("");
  const [englishSummary, setEnglishSummary] = useState("");
  const [hindiSummary, setHindiSummary] = useState("");
  const[medSummary,setMedSummary] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const[phone,setPhone]= useState("");
  const[count,setCount]=useState(0);
  
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Upload a File");
    setLoading(true);
    const formdata = new FormData();
    formdata.append("report", file);
    formdata.append("phone", phone);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formdata,
      });
      const data = await res.json();
      setRawText(data.text || "");
      setEnglishSummary(data.englishsummary || "");
      setHindiSummary(data.hindisummary);
      setMedSummary(data.medsummary);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handlesharemedications = async (e) => {
  e.preventDefault();

  if (!medSummary) return alert("No medications extracted yet!");

  const username = localStorage.getItem("username");
  if (!username) return alert("User not found!");

 
  const savedCount = Number(localStorage.getItem(`count_${username}`)) || 0;

  
  const newCount = savedCount + 1;
  localStorage.setItem(`count_${username}`, newCount);
  setCount(newCount);

  
  const message = `Patient Medications\n\n${medSummary}`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f4f9] via-[#d4eef5] to-[#c8e8f1]">
      
      
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#67C6E3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#4FB3D9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#378BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto p-6 space-y-6">
       
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1a5f7a] via-[#67C6E3] to-[#1a5f7a]">
            Medical Report Analysis
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Upload your medical report for AI-powered analysis and get summaries in both English and Hindi
          </p>
        </div>

        
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 transform transition-all duration-500 hover:shadow-[0_20px_80px_rgba(103,198,227,0.3)]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Medical Report</h2>
            <p className="text-gray-600">Select a medical report file to analyze and get multilingual summaries</p>
          </div>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Report File
              </label>
              <div className="border-2 border-dashed border-[#67C6E3]/40 rounded-2xl p-6 text-center hover:border-[#67C6E3]/60 transition-all bg-white/50 backdrop-blur-sm">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#67C6E3] file:to-[#5BB8D8] file:text-white hover:file:shadow-lg file:transition-all file:cursor-pointer cursor-pointer"
                  accept=".pdf,.doc,.docx,.txt"
                />
                {file && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-sm font-medium text-[#67C6E3]">📄 {file.name}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!file || loading}
              className="relative w-full py-4 px-6 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#67C6E3] to-[#4FB3D9] rounded-2xl transform transition-transform duration-200 group-hover:scale-[0.98] group-active:scale-95"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#5BB8D8] to-[#378BA4] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] rounded-2xl"></div>
              
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
              
              <span className="relative text-white font-bold text-lg tracking-wide drop-shadow-lg">
                {loading ? "Processing Report..." : "Analyze Report"}
              </span>
            </button>
            
          </form>
        </div>

        
        {loading && (
          <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl p-8 text-center border border-white/50">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#67C6E3] to-[#5BB8D8] rounded-2xl animate-pulse mb-4 shadow-lg">
              <div className="w-8 h-8 bg-white/90 rounded-xl"></div>
            </div>
            <p className="text-lg font-semibold text-[#67C6E3] mb-2">Processing The Report...</p>
            <p className="text-gray-600">This may take a few moments</p>
          </div>
        )}

       
        {!loading && (englishSummary || hindiSummary) && (
          <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="mb-6">
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Summary</h2>
              <p className="text-gray-600">Your medical report has been analyzed. Choose your preferred language below.</p>
            </div>
            
            
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setLanguage("English")}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-md ${
                  language === "English"
                    ? "bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white"
                }`}
              >
                🌐 English Summary
              </button>
              <button
                onClick={() => setLanguage("Hindi")}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-md ${
                  language === "Hindi"
                    ? "bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white"
                }`}
              >
                🗣️ हिंदी Summary
              </button>
               <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 919876543210"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#67C6E3] outline-none"
              />
            </div>
              <button onClick={handlesharemedications} className="px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-md bg-gradient-to-r from-[#67C6E3] to-[#5BB8D8] text-white  scale-105">
                📤 Share Medications</button>
            </div>

            
            {language === "English" && englishSummary && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#67C6E3]/20 text-[#67C6E3] rounded-full text-sm font-medium">
                    English
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">Report Summary</h3>
                </div>
                <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border-l-4 border-[#67C6E3] shadow-md">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{englishSummary}</p>
                </div>
              </div>
            )}

         
            {language === "Hindi" && hindiSummary && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#67C6E3]/20 text-[#67C6E3] rounded-full text-sm font-medium">
                    हिंदी
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">रिपोर्ट सारांश</h3>
                </div>
                <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border-l-4 border-[#67C6E3] shadow-md">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{hindiSummary}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      
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
      `}</style>
    </div>
  );
};

export default Upload;
