import React, { useState } from "react";

export default function ResumeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    work: [{ company: "", role: "", duration: "", description: "" }],
    education: [{ course: "", location: "", year: "" }],
    projects: [""],
    skills: [""],
    certifications: [""],
    achievements: [""],
    languages: [""],
    hobbies: [""],
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleNestedChange = (field, index, subField, value) => {
    const newArray = [...formData[field]];
    newArray[index][subField] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addField = (field, defaultValue) => {
    setFormData({ ...formData, [field]: [...formData[field], defaultValue] });
  };

  const removeField = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const labels = {
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    linkedin: "LinkedIn URL",
    github: "GitHub URL",
    portfolio: "Portfolio Website",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
        ATS-Friendly Resume Builder
      </h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(labels).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {labels[field]}
            </label>
            <input
              type="text"
              placeholder={labels[field]}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              required={["name", "email", "phone"].includes(field)}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold">
          Professional Summary / Career Objective
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="A brief summary of your career goals and strengths..."
          rows={4}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Work Experience */}
      <SectionHeader title="Work Experience" />
      {formData.work.map((exp, i) => (
        <div key={i} className="space-y-2 border p-4 rounded-md dark:border-gray-700 relative">
          {["company", "role", "duration", "description"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={`Enter ${field}`}
              value={exp[field]}
              onChange={(e) => handleNestedChange("work", i, field, e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          ))}
          <RemoveButton onClick={() => removeField("work", i)} />
        </div>
      ))}
      <AddButton onClick={() => addField("work", { company: "", role: "", duration: "", description: "" })} label="Experience" />

      {/* Education */}
      <SectionHeader title="Education" />
      {formData.education.map((edu, i) => (
        <div key={i} className="space-y-2 border p-4 rounded-md dark:border-gray-700 relative">
          {["course", "location", "year"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={`Enter ${field}`}
              value={edu[field]}
              onChange={(e) => handleNestedChange("education", i, field, e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          ))}
          <RemoveButton onClick={() => removeField("education", i)} />
        </div>
      ))}
      <AddButton onClick={() => addField("education", { course: "", location: "", year: "" })} label="Education" />

      {/* Dynamic Sections */}
      {[
        { field: "projects", label: "Projects" },
        { field: "skills", label: "Skills" },
        { field: "certifications", label: "Certifications" },
        { field: "achievements", label: "Achievements" },
        { field: "languages", label: "Languages" },
        { field: "hobbies", label: "Hobbies" },
      ].map(({ field, label }) => (
        <div key={field}>
          <SectionHeader title={label} />
          {formData[field].map((val, i) => (
            <div key={i} className="flex items-center gap-2 mt-1 mb-2 relative">
              <input
                type="text"
                placeholder={`Enter ${label.slice(0, -1)} ${i + 1}`}
                value={val}
                onChange={(e) => handleArrayChange(field, i, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              />
              <RemoveButton onClick={() => removeField(field, i)} />
            </div>
          ))}
          <AddButton onClick={() => addField(field, "")} label={label.slice(0, -1)} />
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold text-lg"
      >
        Generate Resume
      </button>
    </form>
  );
}

const SectionHeader = ({ title }) => (
  <h3 className="text-xl font-semibold mt-4 text-gray-700 dark:text-gray-200">{title}</h3>
);

const AddButton = ({ onClick, label }) => (
  <div className="mt-2 flex justify-end">
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
    >
      ➕ Add {label}
    </button>
  </div>
);

const RemoveButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-red-500 hover:text-red-700 text-xl absolute top-2 right-2"
  >
    ❌
  </button>
);