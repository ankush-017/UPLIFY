import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlinkingCursor = ({ darkMode }) => (
  <span
    className={`inline-block w-3 h-6 ml-2 animate-pulse ${
      darkMode ? "bg-yellow-400" : "bg-green-600"
    }`}
    aria-hidden="true"
  ></span>
);

export default function NotFound() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center font-mono px-6 pb-10 transition-colors duration-500 ${
        darkMode ? "bg-black text-yellow-500" : "bg-white text-green-900"
      }`}
    >
      {/* Subtle Scanline Overlay for Dark Mode Only */}
      {darkMode && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-0 pointer-events-none bg-[length:100%_4px]"></div>
      )}

      <div
        className={`w-full max-w-4xl border-4 p-8 relative z-10 ${
          darkMode 
            ? "border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)] bg-black" 
            : "border-green-800 bg-gray-50 shadow-xl"
        }`}
      >
        {/* Header Section */}
        <div className={`mb-8 border-b-2 pb-4 ${darkMode ? "border-yellow-900" : "border-green-200"}`}>
          <h1
            className={`text-5xl sm:text-7xl font-black italic uppercase tracking-tighter ${
              darkMode ? "text-yellow-400 italic" : "text-green-700"
            }`}
          >
            404_NULL
          </h1>
          <p className={`mt-2 font-bold uppercase tracking-widest ${darkMode ? "text-yellow-700" : "text-green-600/60"}`}>
            Terminal Path Disconnected
          </p>
        </div>

        {/* Diagnostic Logs */}
        <div className="text-sm sm:text-lg space-y-2 font-mono leading-tight">
          <p className="opacity-60">[LOG]: Initializing sequence...</p>
          <p className="opacity-60">[LOG]: Mapping directory nodes...</p>
          <div className={`p-4 my-6 border-2 border-dashed ${
            darkMode 
              ? "bg-yellow-950/20 border-yellow-500 text-yellow-200" 
              : "bg-green-100 border-green-800 text-green-900"
          }`}>
            <p className="font-bold underline mb-1">DETECTION_ERROR:</p>
            <p>&gt; Target: "{window.location.pathname}"</p>
            <p>&gt; Result: NOT_FOUND_IN_SYSTEM</p>
          </div>
          <p className="animate-pulse italic">Waiting for user input...</p>
        </div>

        {/* Action Prompt */}
        <div className="mt-10">
          <div className="flex items-center mb-6">
            <span className="font-bold">
              {darkMode ? "visitor@uplify:~$" : "C:\\USERS\\GUEST>"}
            </span>
            <span className="ml-2">cd /home</span>
            <BlinkingCursor darkMode={darkMode} />
          </div>
          
          <Link
            to="/"
            className={`inline-block px-10 py-4 font-black uppercase text-xl transition-all border-b-4 active:translate-y-1 active:border-b-0 ${
              darkMode
                ? "bg-yellow-500 text-black border-yellow-700 hover:bg-yellow-400"
                : "bg-green-800 text-white border-green-950 hover:bg-green-700"
            }`}
          >
            Execute Return
          </Link>
        </div>
      </div>

      {/* Footer Details */}
      <footer className={`absolute bottom-6 text-[10px] font-bold tracking-[0.3em] uppercase ${
        darkMode ? "text-yellow-900" : "text-green-900/40"
      }`}>
        Uplify_Core_v1.0 // Access_Level: Restricted // Status: 404
      </footer>
    </div>
  );
}