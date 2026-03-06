import AdminNavbar from '../components/AdminNavbar';

const ASHA_STATS = [
  { label: "Active ASHAs", value: "1,240", description: "Registered in the system" },
  { label: "Reports Processed", value: "8,500+", description: "Medical reports analyzed" },
  { label: "Patients Served", value: "12,000+", description: "Across rural districts" },
  { label: "Languages Supported", value: "2", description: "English & Hindi" },
];

const Asha = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">ASHA Worker Overview</h1>
          <p className="text-gray-500 text-sm">Monitor field-level ASHA worker activity and platform usage statistics.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {ASHA_STATS.map(({ label, value, description }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
              <p className="text-xs text-gray-400">{description}</p>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-gray-900">About ASHA Workers</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Accredited Social Health Activists (ASHAs) are trained female community health
              activists in rural India. They serve as a link between communities and the health
              system, helping villagers access government healthcare services and information.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-gray-900">Platform Role</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Asha Saathi empowers ASHA workers to upload patient medical reports and receive
              AI-generated summaries in Hindi. This allows them to explain diagnoses to patients
              in their native language without needing medical training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asha;