import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../../superbaseClient.js";
import { toast } from "react-hot-toast";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { applyInternBG } from "../../../assets/image.js";


export default function ApplicationForm() {
  const { id: internshipId } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    cover_letter: "",
    internship_id: "",
    uid: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && internshipId) {
      setForm((prev) => ({
        ...prev,
        uid: user.uid,
        internship_id: internshipId,
      }));
    }
  }, [user, internshipId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      toast.error("Please upload a resume file.");
      return null;
    }

    const fileExt = resumeFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { data, error } = await supabase.storage
      .from("uplify-resumes")
      .upload(filePath, resumeFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: resumeFile.type,
      });

    if (error) {
      toast.error("Resume upload failed.");
      return null;
    }

    const { data: publicData } = supabase.storage
      .from("uplify-resumes")
      .getPublicUrl(filePath);

    return publicData?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resumeUrl = await uploadResume();

    const { error } = await supabase.from("applyapplications").insert([
      {
        ...form,
        resume_url: resumeUrl,
        internship_id: internshipId,
        uid: user.uid,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("Submission failed");
      console.error(error);
    } else {
      toast.success("Application submitted!");
      setForm({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        cover_letter: "",
        internship_id: "",
        uid: "",
      });
      setResumeFile(null);
    }
  };

  return (
    <div
      className="flex justify-center items-center px-4 py-10 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${applyInternBG})`,
        backgroundBlendMode: "overlay",
        backgroundColor: darkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.6)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-3xl ${darkMode ? "bg-black/70" : "bg-white/80"} backdrop-blur-md border border-white/30 shadow-2xl p-10 rounded-3xl`}
      >
        <h2
          className={`text-4xl font-bold text-center mb-8 ${
            darkMode ? "text-yellow-400" : "text-purple-700"
          }`}
        >
          Internship Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            ["name", "Full Name"],
            ["email", "Email Address"],
            ["phone", "Phone Number"],
            ["linkedin", "LinkedIn Profile"],
            ["github", "GitHub Profile"],
            ["portfolio", "Portfolio Link"],
          ].map(([name, label]) => (
            <TextField
              key={name}
              fullWidth
              label={label}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required={["name", "email", "phone"].includes(name)}
              variant="outlined"
              InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
              InputProps={{
                style: {
                  color: darkMode ? "white" : "#4A148C",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "#aaa" : "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "#facc15" : "#8e24aa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ab47bc",
                  },
                },
                "& label.Mui-focused": {
                  color: "#ab47bc",
                },
              }}
            />
          ))}

          <TextField
            fullWidth
            label="Cover Letter"
            name="cover_letter"
            value={form.cover_letter}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
            InputProps={{
              style: {
                color: darkMode ? "white" : "#4A148C",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#aaa" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#facc15" : "#8e24aa",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ab47bc",
                },
              },
              "& label.Mui-focused": {
                color: "#ab47bc",
              },
            }}
          />

          <div className={`${darkMode?"text-white":"text-black"}`}>
            <label className="block mb-2 font-semibold">
              Upload Resume (.pdf, .docx)
            </label>
            <input
              type="file"
              onChange={handleResumeChange}
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-purple-600 hover:file:bg-purple-700 transition"
              required
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              backgroundColor: "#ab47bc",
              "&:hover": { backgroundColor: "#9c27b0" },
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              py: 1.5,
            }}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}