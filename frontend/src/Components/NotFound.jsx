import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlinkingCursor = ({ darkMode }) => (
  <span
    className={`inline-block w-3 h-6 ml-2 animate-pulse ${
      darkMode ? "bg-red-400" : "bg-blue-400"
    }`}
    aria-hidden="true"
  ></span>
);

export default function NotFound() {
  // Get dark mode from Redux store
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center font-mono px-6 pb-10 ${
        darkMode ? "bg-gray-900" : "bg-blue-50"
      }`}
    >
      <div
        className={`w-full max-w-4xl border-2 rounded-lg p-8 shadow-[0_0_30px_rgba(168,85,247,0.3)] ${
          darkMode ? "border-red-500/50" : "border-blue-500/50 bg-black"
        }`}
      >
        {/* Header with gradient text */}
        <div className="text-center mb-8 ">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text tracking-wider ${
              darkMode
                ? "bg-gradient-to-r from-red-400 to-red-600"
                : "bg-gradient-to-r from-blue-400 to-blue-600"
            }`}
          >
            404: Resource Unresolved
          </h1>
          <p
            className={`mt-2 ${
              darkMode ? "text-red-300/80" : "text-blue-300/80"
            }`}
          >
            A fatal exception has occurred in the routing matrix.
          </p>
        </div>

        {/* Console-style output */}
        <div
          className={`text-base sm:text-lg space-y-2 ${
            darkMode ? "text-red-300" : "text-blue-300"
          }`}
        >
          <p>&gt; RUNNING DIAGNOSTICS...</p>
          <p>&gt; SCANNING MEMORY SECTORS...</p>
          <p className={darkMode ? "text-red-500" : "text-red-600"}>
            &gt; <span className="font-bold">ERROR:</span> Page reference{" "}
            <span className={darkMode ? "text-red-400" : "text-yellow-400"}>
              '{window.location.pathname}'
            </span>{" "}
            not found in active directory.
          </p>
          <p>
            &gt; The resource may have been moved, deleted, or is temporarily
            unavailable.
          </p>
          <p>&gt; Check for typos in the URL or return to a known safe entry point.</p>
        </div>

        {/* Interactive prompt to return home */}
        <div className="mt-10 flex items-center">
          <p className={darkMode ? "text-red-300" : "text-blue-300"}>
            &gt; Return to homepage?
          </p>
          <BlinkingCursor darkMode={darkMode} />
        </div>
        <div className="mt-4">
          <Link
            to="/"
            className={`inline-block px-6 py-2 font-bold rounded transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode
                ? "text-black bg-gradient-to-r from-red-400 to-red-600 focus:ring-red-300 focus:ring-offset-gray-900"
                : "text-black bg-gradient-to-r from-blue-400 to-blue-600 focus:ring-blue-300 focus:ring-offset-white"
            } hover:opacity-90`}
          >
            CONFIRM
          </Link>
        </div>
      </div>

      {/* Footer text with a subtle gradient */}
      <footer
        className={`absolute bottom-4 text-sm text-transparent bg-clip-text ${
          darkMode
            ? "bg-gradient-to-r from-red-700 to-red-900"
            : "bg-gradient-to-r from-blue-700 to-blue-900"
        }`}
      >
        Uplify Core v1.0 | System Status: ONLINE
      </footer>
    </div>
  );
}