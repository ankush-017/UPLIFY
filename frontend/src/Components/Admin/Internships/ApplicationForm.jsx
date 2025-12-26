import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../../superbaseClient.js";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { applyInternBG } from "../../../assets/image.js";
import {
  FileText, User, Mail, Phone, Linkedin, Github,
  Globe, Send, CheckCircle, ShieldCheck,
  MapPin, Banknote, Laptop, Layers, Sparkles, Navigation
} from "lucide-react";
import Seo from "../../Seo.jsx";

export default function ApplicationForm() {
  const { id: internshipId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [internshipData, setInternshipData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin: "",
    github: "", portfolio: "", cover_letter: "",
    internship_id: "", uid: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        setDataLoading(true);
        const { data, error } = await supabase
          .from("internships")
          .select("title, company, id, location, stipend, type, skills")
          .eq("id", internshipId)
          .single();

        if (error) throw error;
        setInternshipData(data);
      } catch (error) {
        console.error("Error fetching:", error.message);
        toast.error("Could not load internship details.");
      } finally {
        setDataLoading(false);
      }
    };
    if (internshipId) fetchInternshipDetails();
  }, [internshipId]);

  useEffect(() => {
    if (user && internshipId) {
      setForm((prev) => ({ ...prev, uid: user.uid, internship_id: internshipId }));
    }
  }, [user, internshipId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleResumeChange = (e) => setResumeFile(e.target.files[0]);

  const uploadResume = async () => {
    if (!resumeFile) { toast.error("Please upload your resume."); return null; }
    const fileExt = resumeFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;
    const { error } = await supabase.storage.from("uplify-resumes").upload(filePath, resumeFile);
    if (error) { toast.error("File upload failed."); return null; }
    const { data: publicData } = supabase.storage.from("uplify-resumes").getPublicUrl(filePath);
    return publicData?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data: existing } = await supabase.from("applyapplications").select("*").eq("uid", user.uid).eq("internship_id", internshipId);
    if (existing?.length > 0) { toast.error("Application already submitted!"); setLoading(false); return; }
    const resumeUrl = await uploadResume();
    if (!resumeUrl) { setLoading(false); return; }
    const { error } = await supabase.from("applyapplications").insert([{ ...form, resume_url: resumeUrl, internship_id: internshipId, uid: user.uid }]);
    setLoading(false);
    if (error) { toast.error("Submission failed"); }
    else { setSubmitted(true); setTimeout(() => navigate('/'), 3000); }
  };

  const inputFields = [
    { name: "name", label: "Full Name", icon: <User size={16} />, type: "text", required: true },
    { name: "email", label: "Email Address", icon: <Mail size={16} />, type: "email", required: true },
    { name: "phone", label: "Contact No", icon: <Phone size={16} />, type: "tel", required: true },
    { name: "linkedin", label: "LinkedIn", icon: <Linkedin size={16} />, type: "url" },
    { name: "github", label: "GitHub", icon: <Github size={16} />, type: "url" },
    { name: "portfolio", label: "Portfolio", icon: <Globe size={16} />, type: "url" },
  ];

  return (
    <>
      <Seo title={`Career Portal | ${internshipData?.title || 'Internship'}`} />

      <div className={`min-h-screen flex items-center justify-center p-6 md:p-12 relative font-sans transition-all duration-700 ${darkMode ? 'bg-[#010801]' : 'bg-[#f8fafc]'}`}>

        {/* Soft Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-emerald-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-yellow-400/10 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative w-full max-w-6xl z-10 backdrop-blur-2xl rounded-[2.5rem] border overflow-hidden shadow-2xl ${darkMode ? "bg-black/60 border-white/10 shadow-emerald-950/20" : "bg-white/90 border-slate-200 shadow-slate-200"
            }`}
        >
          <div className="grid lg:grid-cols-12">

            {/* --- LEFT SIDE: THE INFO HUB --- */}
            <div className={`lg:col-span-5 p-8 md:p-14 ${darkMode ? 'bg-[#030c03]/50' : 'bg-emerald-50/20'}`}>
              {!dataLoading ? (
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-2 mb-10">
                      <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-md border border-emerald-500/20 tracking-widest uppercase">Premium</span>
                      <span className="bg-yellow-500/10 text-yellow-600 text-[10px] font-bold px-3 py-1 rounded-md border border-yellow-500/20 tracking-widest uppercase">Hiring</span>
                    </div>

                    <p className={`text-xs font-black tracking-[0.2em] mb-3 uppercase ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {internshipData?.company}
                    </p>
                    <h1 className={`text-4xl font-black tracking-tight leading-tight mb-12 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {internshipData?.title}
                    </h1>

                    {/* Simple Tags Grid */}
                    <div className="space-y-4">
                      {[
                        { icon: <MapPin size={16} />, tag: "Location", val: internshipData?.location },
                        { icon: <Banknote size={16} />, tag: "Stipend", val: internshipData?.stipend },
                        { icon: <Layers size={16} />, tag: "Experience", val: internshipData?.experience },
                        { icon: <Laptop size={16} />, tag: "Work Type", val: internshipData?.type },
                        { icon: <Laptop size={16} />, tag: "Technology", val: internshipData?.skills }
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
                          <div className="text-emerald-500 bg-emerald-500/10 p-2.5 rounded-xl">{item.icon}</div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.tag}</p>
                            <p className={`text-[13px] font-black ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.val || "Fresher"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-10 p-5 rounded-2xl border flex items-center gap-4 ${darkMode ? 'border-white/5 bg-white/5' : 'border-emerald-100 bg-white'}`}>
                    <ShieldCheck className="text-emerald-500" size={24} />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                      Your data is <span className={darkMode ? 'text-white' : 'text-slate-900'}>Verified & Secured</span> by Uplify.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse space-y-8">
                  <div className="h-6 w-24 bg-white/5 rounded-md" />
                  <div className="h-12 w-full bg-white/5 rounded-xl" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl" />)}
                  </div>
                </div>
              )}
            </div>

            {/* --- RIGHT SIDE: THE FORM --- */}
            <div className="lg:col-span-7 p-8 md:p-14 bg-transparent border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-white/5">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                  <div className="mb-10">
                    <h3 className={`text-lg font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Candidate Profile</h3>
                    <p className="text-slate-500 text-xs mt-1">Please provide your professional credentials.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {inputFields.map((f) => (
                      <div key={f.name} className="relative">
                        <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {f.label}
                        </label>
                        <div className="relative group">
                          <span className={`absolute left-0 bottom-3 transition-colors ${darkMode ? 'text-slate-700' : 'text-slate-300'} group-focus-within:text-emerald-500`}>
                            {f.icon}
                          </span>
                          <input
                            type={f.type} name={f.name} required={f.required} value={form[f.name]} onChange={handleChange}
                            className={`w-full pl-7 py-2.5 bg-transparent text-sm border-b transition-all outline-none ${darkMode ? 'border-white/10 text-white focus:border-emerald-500' : 'border-slate-200 text-slate-800 focus:border-emerald-500'
                              }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-6">
                    <div>
                      <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Message for Hiring Manager</label>
                      <textarea name="cover_letter" rows={2} value={form.cover_letter} onChange={handleChange}
                        className={`w-full p-4 rounded-xl border bg-transparent text-sm transition-all outline-none ${darkMode ? 'border-white/10 text-white focus:border-emerald-500' : 'border-slate-200 text-slate-800 focus:border-emerald-500'
                          }`} placeholder="A brief intro..." />
                    </div>

                    <div className="relative group pt-2">
                      <input
                        type="file"
                        onChange={handleResumeChange}
                        accept=".pdf,.docx"
                        className="hidden"
                        id="resume-upload"
                        required
                      />
                      <label
                        htmlFor="resume-upload"
                        className={`
      cursor-pointer w-full flex items-center justify-between p-5 rounded-2xl 
      border-2 border-dotted transition-all duration-300 ease-in-out
      ${resumeFile
                            ? 'border-solid border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                            : darkMode
                              ? 'border-white/20 hover:border-solid hover:border-emerald-500 hover:bg-white/5'
                              : 'border-slate-300 hover:border-solid hover:border-emerald-500 hover:bg-emerald-50/50'
                          }
      active:scale-[0.98] group-hover:shadow-lg
    `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
        p-2.5 rounded-xl transition-colors duration-300
        ${resumeFile
                              ? 'bg-emerald-500 text-black'
                              : 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black'
                            }
      `}>
                            <FileText size={18} />
                          </div>

                          <div className="flex flex-col">
                            <p className={`text-[13px] font-black tracking-tight ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                              {resumeFile ? resumeFile.name : "Upload Resume"}
                            </p>
                            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">
                              {resumeFile ? "File ready for transmission" : "PDF or DOCX • Max 5MB"}
                            </p>
                          </div>
                        </div>

                        <div className={`
      transition-all duration-300 
      ${resumeFile ? 'text-emerald-500 rotate-0' : 'text-slate-400 -rotate-45 group-hover:rotate-0 group-hover:text-emerald-500'}
    `}>
                          <Navigation size={16} />
                        </div>
                      </label>
                    </div>

                    {/* Centered Narrow Button */}
                    <div className="flex justify-center pt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full md:w-[60%] py-4 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {loading ? "Sending..." : "Submit Application"} <Send size={16} />
                        </span>
                        <div className="absolute inset-0 bg-yellow-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h2 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Application Sent</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Good Luck Candidate!</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}