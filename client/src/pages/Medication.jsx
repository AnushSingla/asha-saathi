import React, { useState } from "react";
import Navbar from "../components/Navbar";

const COMMON_MEDS = [
  {
    name: "ORS (Oral Rehydration Salts)",
    use: "Dehydration, diarrhea",
    dose: "1 sachet dissolved in 1 litre clean water",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: "Iron & Folic Acid",
    use: "Anaemia prevention, pregnancy",
    dose: "1 tablet daily after meals",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: "Paracetamol",
    use: "Fever, mild pain",
    dose: "500 mg every 4-6 hours (max 4 doses/day)",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: "Zinc Sulphate",
    use: "Diarrhea treatment (children)",
    dose: "Children < 6 months: ½ tablet; > 6 months: 1 tablet for 14 days",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Cotrimoxazole",
    use: "Pneumonia, infections",
    dose: "As prescribed by doctor; 2 tablets twice daily for adults",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    name: "Vitamin A",
    use: "Vitamin A deficiency, child immunity",
    dose: "Children 1-5 yrs: 200,000 IU every 6 months",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const Medication = () => {
  const [search, setSearch] = useState("");

  const filtered = COMMON_MEDS.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.use.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"></span>
            ASHA Worker Reference
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medication Guide</h1>
          <p className="text-gray-500 text-sm">
            Quick reference for common medications used in community healthcare.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-6">

          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              aria-label="Search medication or condition"
              placeholder="Search medication or condition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-colors shadow-sm"
            />
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((med, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-teal-200 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <div className="text-teal-600">{med.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{med.name}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <span className="font-medium text-gray-700">Use: </span>{med.use}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                      <span className="font-medium text-gray-700">Dose: </span>{med.dose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">No medications found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 text-center mt-8">
            Always consult a doctor before administering medication. This guide is for reference only.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Medication;
