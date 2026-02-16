import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  FolderKanban,
  Users,
  Briefcase
} from "lucide-react";

const NavItem = ({ to, title, desc, Icon, darkMode, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`group flex items-start gap-3 px-5 py-4 transition-all duration-200
      ${
        darkMode
          ? "hover:bg-green-900/30"
          : "hover:bg-green-50"
      }`}
    >
      {/* Icon */}
      <div
        className={`mt-1 p-2 rounded-lg transition-colors
        ${
          darkMode
            ? "bg-green-900 text-yellow-400"
            : "bg-green-100 text-green-600 group-hover:text-yellow-500"
        }`}
      >
        <Icon size={18} />
      </div>

      {/* Text */}
      <div>
        <p
          className={`font-semibold transition-colors
          ${
            darkMode
              ? "text-gray-100 group-hover:text-yellow-400"
              : "text-gray-800 group-hover:text-green-700"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-sm
          ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {desc}
        </p>
      </div>
    </NavLink>
  );
};



const ExploreDropdown = ({ role, isAuthenticated, darkMode }) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  if (!(role === "student" || role === "admin" || !isAuthenticated)) {
    return null;
  }

  return (
    <div
      className="relative"
      // onMouseEnter={() => setIsExploreOpen(true)}
    //   onMouseLeave={() => setIsExploreOpen(false)}
    >
      {/* Explore Button */}
      <button
        className={`group flex items-center gap-1 px-2 font-semibold transition-all
        ${
          darkMode
            ? "text-gray-200 hover:text-yellow-600"
            : "text-gray-700 hover:text-yellow-600"
        }`}

        onClick={() => {
            const value = isExploreOpen === true?false:true;
            setIsExploreOpen(value);
        }}
      >
        Explore
        <span
          className={`transition-transform duration-200 ${
            isExploreOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-4 min-w-[260px] rounded-xl overflow-hidden
        transition-all duration-200 ease-out z-50
        ${
          isExploreOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }
        ${
          darkMode
            ? "bg-gray-900/90 backdrop-blur-xl border border-green-700 shadow-[0_10px_40px_rgba(34,197,94,0.35)]"
            : "bg-white/90 backdrop-blur-xl border border-green-200 shadow-[0_10px_40px_rgba(34,197,94,0.25)]"
        }`}
      >
        <NavItem
          to="/user/projects-library"
          title="Projects Library"
          desc="Build real-world projects"
          Icon={FolderKanban}
          darkMode={darkMode}
          onClick={() => setIsExploreOpen(false)}
        />

        <NavItem
          to="/user/uplify-community"
          title="Uplify Community"
          desc="Learn & grow together"
          Icon={Users}
          darkMode={darkMode}
          onClick={() => setIsExploreOpen(false)}
        />

        <NavItem
          to="/user/uplify-internship"
          title="Uplify Internship"
          desc="Career-focused internships"
          Icon={Briefcase}
          darkMode={darkMode}
          onClick={() => setIsExploreOpen(false)}
        />
      </div>
    </div>
  );
};
export default ExploreDropdown;