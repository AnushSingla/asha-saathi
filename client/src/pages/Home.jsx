import Upload from "../components/Upload";
import Navbar from "../components/Navbar";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload Report",
    description: "Securely upload your medical report image in JPG, PNG, or WEBP format.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our AI engine reads the report content and extracts key medical information.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Simple Summary",
    description: "Receive a clear, plain-language summary in English or Hindi instantly.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: "Multilingual",
    description: "Summaries in both English and Hindi for wider accessibility.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    title: "Simple Language",
    description: "Medical jargon translated into plain, easy-to-understand words.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: "Fast Analysis",
    description: "AI-powered processing delivers your summary in seconds.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Secure Upload",
    description: "Your reports are processed securely and never permanently stored.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "WhatsApp Sharing",
    description: "Share medication summaries directly with patients via WhatsApp.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.12 1.517 5.854L.057 23.882a.5.5 0 00.606.61l6.163-1.457A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.951 0-3.775-.537-5.328-1.469l-.38-.231-3.938.931.949-3.824-.247-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    title: "Free to Use",
    description: "Fully accessible to every patient and healthcare worker who needs it.",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: marketing copy */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"></span>
                AI-Powered Healthcare
              </span>

              <h1 className="text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-5">
                Understand Your Medical&nbsp;Reports{" "}
                <span className="text-teal-600">Instantly</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Upload your medical report and receive AI-powered summaries in
                simple, plain language — available in English and Hindi.
              </p>

              <ul className="space-y-3">
                {[
                  "Multilingual summaries in English & Hindi",
                  "Simple explanations for complex medical terms",
                  "Fast AI analysis delivered in seconds",
                  "Share medication results via WhatsApp",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-4">
                {["OCR-Powered", "Hindi + English", "Instant Results"].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: upload card */}
            <div className="lg:pt-2">
              <Upload />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Three simple steps to get your medical report explained in plain language
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, description, icon }) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                    {step}
                  </span>
                  <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
                    {icon}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Use Asha Saathi</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Designed for patients and healthcare workers who deserve clear health information
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ title, description, icon }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group"
              >
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-teal-500 rounded-lg flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-white rounded-sm"></div>
            </div>
            <span className="text-white font-semibold text-sm">Asha Saathi</span>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Asha Saathi — Making healthcare accessible for everyone.
          </p>
          <div className="flex gap-5 text-xs">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

