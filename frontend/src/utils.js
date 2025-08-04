// utils/generateResume.js
import axios from 'axios';

export const generateResume = async (formData) => {
const prompt = `
You are a professional resume builder AI. Generate a clean, modern, and ATS-friendly resume in **markdown format** based on the following user information. Use proper section headings, bullet points, and markdown formatting.

---

### Personal Details
- **Name**: ${formData.name}
- **Email**: ${formData.email}
- **Phone**: ${formData.phone}
${formData.linkedin ? `- **LinkedIn**: ${formData.linkedin}` : ''}
${formData.github ? `- **GitHub**: ${formData.github}` : ''}
${formData.portfolio ? `- **Portfolio**: ${formData.portfolio}` : ''}

---

${formData.summary ? `### Summary\n${formData.summary}\n\n---\n` : ''}

${formData.work.length > 0 ? `### Work Experience\n${formData.work
  .map(
    (w) =>
      `**${w.role}** at **${w.company}** (${w.duration})\n${w.description}`
  )
  .join('\n\n')}\n\n---\n` : ''}

${formData.education.length > 0 ? `### Education\n${formData.education
  .map(
    (edu, index) =>
      `${index + 1}. **${edu.course}**, ${edu.location} (${edu.year})`
  )
  .join('\n')}\n\n---\n` : ''}

${formData.projects.filter((p) => p.trim()).length > 0 ? `### Projects\n${formData.projects
  .filter((p) => p.trim())
  .map((proj, i) => `${i + 1}. ${proj}`)
  .join('\n')}\n\n---\n` : ''}

${formData.skills.filter((s) => s.trim()).length > 0 ? `### Skills\n${formData.skills
  .filter((s) => s.trim())
  .map((skill) => `- ${skill}`)
  .join('\n')}\n\n---\n` : ''}

${formData.certifications.filter((c) => c.trim()).length > 0 ? `### Certifications\n${formData.certifications
  .filter((c) => c.trim())
  .map((cert, i) => `${i + 1}. ${cert}`)
  .join('\n')}\n\n---\n` : ''}

${formData.achievements.filter((a) => a.trim()).length > 0 ? `### Achievements\n${formData.achievements
  .filter((a) => a.trim())
  .map((ach, i) => `${i + 1}. ${ach}`)
  .join('\n')}\n\n---\n` : ''}

${formData.languages.filter((l) => l.trim()).length > 0 ? `### Languages\n${formData.languages
  .filter((lang) => lang.trim())
  .map((lang) => `- ${lang}`)
  .join('\n')}\n\n---\n` : ''}

${formData.hobbies.filter((hobby) => hobby.trim()).length > 0 ? `### Hobbies\n${formData.hobbies
  .filter((hobby) => hobby.trim())
  .map((hobby) => `- ${hobby}`)
  .join('\n')}\n\n---\n` : ''}
- Format the resume in **markdown**.
- Use **proper headings**, **bold text**, and **clear structure**.
- Do not add any commentary, summary, or explanation.
- Do not include an image but mention that the image is optional.
`;

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini`, {
      prompt,
    });
    console.log("Response aa gya hai");
    return res.data.response;
  } 
  catch (err) {
    console.error('Error generating resume:', err);
    throw new Error('Resume generation failed');
  }
  
};