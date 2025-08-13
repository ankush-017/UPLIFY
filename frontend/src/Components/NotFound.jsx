// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-gray-800 tracking-tight">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}