import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Facebook, Linkedin, Mail, Twitter, Globe } from 'lucide-react';

function FooterCompany() {
    return (
        <footer className="bg-[#050a14] text-slate-400 py-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* 1. Brand & Tagline */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block transition-opacity hover:opacity-80">
                            <img src={logo} alt="Uplify" className="h-12 brightness-110" />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs text-slate-500">
                            The intelligent bridge between student talent and world-class companies. 
                            Hiring, redefined.
                        </p>
                    </div>

                    {/* 2. Platform Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/post" className="hover:text-[#3DDC84] transition-colors">Post Internship</Link></li>
                            <li><Link to="/track" className="hover:text-[#3DDC84] transition-colors">Track Applications</Link></li>
                            <li><Link to="/pricing" className="hover:text-[#3DDC84] transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* 3. Company Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-[#3DDC84] transition-colors">About Us</Link></li>
                            <li><Link to="/blog" className="hover:text-[#3DDC84] transition-colors">Resources</Link></li>
                            <li><Link to="/privacy" className="hover:text-[#3DDC84] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* 4. Social & Support */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Connect</h4>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Facebook, Mail].map((Icon, idx) => (
                                <a 
                                    key={idx} 
                                    href="#" 
                                    className="text-slate-500 hover:text-[#3DDC84] transform hover:-translate-y-1 transition-all duration-200"
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                        <p className="text-xs font-medium text-slate-400">hello@uplify.in</p>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        <span>© {new Date().getFullYear()} Uplify AI</span>
                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span className="flex items-center gap-1">
                            <Globe size={12} className="text-[#3DDC84]" /> EN-US
                        </span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 bg-[#3DDC84]/5 rounded-full border border-[#3DDC84]/10">
                        <div className="w-1.5 h-1.5 bg-[#3DDC84] rounded-full animate-pulse shadow-[0_0_8px_#3DDC84]" />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-[#3DDC84]">System Live</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterCompany;