import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-300 pt-16 pb-8 px-6">
      
      {/* Soft top glow */}
      {/* <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-transparent blur-3xl pointer-events-none" /> */}

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Logo & About */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Uplify" className="h-10 scale-[1.8] ml-3" />
          </Link>

          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Your one-stop platform for internships, skill-building courses,
            and career tools designed for modern students.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm mb-4 text-green-500 font-semibold tracking-wide uppercase">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/internships" className="hover:text-yellow-400 transition">
                Internships
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-yellow-400 transition">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-yellow-400 transition">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-green-500 tracking-wide uppercase">
            Tools
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/resume" className="hover:text-yellow-400 transition">
                Resume Builder
              </Link>
            </li>
            <li>
              <Link
                to="/user/uplify-community"
                className="hover:text-yellow-400 transition"
              >
                Uplify Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-green-500 tracking-wide uppercase">
            Connect
          </h4>

          <p className="text-sm text-gray-400 mb-4">
            Email:{' '}
            <a
              href="mailto:hello@uplify.in"
              className="hover:text-yellow-400 transition"
            >
              hello@uplify.in
            </a>
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400/20 hover:text-yellow-400 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400/20 hover:text-yellow-400 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400/20 hover:text-yellow-400 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hello@uplify.in"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400/20 hover:text-yellow-400 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-gray-300">Uplify</span>. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;