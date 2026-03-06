import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Upload = () => {
  const [rawtext, setRawText] = useState("");
  const [englishSummary, setEnglishSummary] = useState("");
  const [hindiSummary, setHindiSummary] = useState("");
  const [medSummary, setMedSummary] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [phone, setPhone] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (selectedFile) => {
    if (selectedFile) setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };
  
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Upload a File");
    setLoading(true);
    const formdata = new FormData();
    formdata.append("report", file);
    formdata.append("phone", phone);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formdata,
      });
      if (res.status === 401) {
        alert("Please login first.");
        navigate("/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Upload failed.");
        return;
      }
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

  
  const message = `Patient Medications\n\n${medSummary}`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
};

  return (
    <div className="space-y-5">

      {/* Upload card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Upload Medical Report</h2>
          <p className="text-sm text-gray-400 mt-1">Drag & drop or click to select your report</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Drag-and-drop zone */}
          <div
            className={`border-2 border-dashed rounded-xl py-10 px-6 text-center cursor-pointer transition-all select-none ${
              dragOver
                ? "border-teal-400 bg-teal-50"
                : file
                ? "border-teal-300 bg-teal-50/50"
                : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
              accept=".jpg,.jpeg,.png,.webp,.pdf"
            />

            {file ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-teal-700 max-w-[220px] truncate">{file.name}</p>
                <p className="text-xs text-gray-400">Click to change file</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Drag & drop your medical report or{" "}
                    <span className="text-teal-600 font-semibold">click to upload</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1.5">Supported formats: JPG, PNG, WEBP</p>
                </div>
              </div>
            )}
          </div>

          {/* Analyze button */}
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing Report...
              </span>
            ) : (
              "Analyze Report"
            )}
          </button>
        </form>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="inline-flex items-center gap-3 text-teal-600">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="font-medium text-sm">Analyzing your report — this may take a moment…</span>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && (englishSummary || hindiSummary) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Report Summary</h2>
          <p className="text-sm text-gray-400 mb-5">Choose your preferred language below.</p>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <button
              onClick={() => setLanguage("English")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === "English"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌐 English
            </button>
            <button
              onClick={() => setLanguage("Hindi")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === "Hindi"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🗣️ हिंदी
            </button>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp number (e.g. 919876543210)"
              className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-400 outline-none"
            />

            <button
              onClick={handlesharemedications}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.12 1.517 5.854L.057 23.882a.5.5 0 00.606.61l6.163-1.457A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.951 0-3.775-.537-5.328-1.469l-.38-.231-3.938.931.949-3.824-.247-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Share Medications
            </button>
          </div>

          {/* Summary text */}
          {language === "English" && englishSummary && (
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-teal-500">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{englishSummary}</p>
            </div>
          )}
          {language === "Hindi" && hindiSummary && (
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-teal-500">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{hindiSummary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
