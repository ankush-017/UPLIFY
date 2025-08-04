import React from 'react';

function ResumePreview({ data }) {
    const { name, experience, projects, skills, education, certifications, achievements, location } = data;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg max-w-3xl mx-auto mt-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">{name}</h1>
            {location && <p className="text-center text-sm text-gray-500">{location}</p>}

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-1">Professional Summary</h2>
                <p>{experience}</p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-1">Projects</h2>
                <ul className="list-disc ml-6">
                    {projects?.map((project, i) => (
                        <li key={i}>{project}</li>
                    ))}
                </ul>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-1">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills?.map((skill, i) => (
                        <span key={i} className="bg-blue-100 dark:bg-blue-700 text-sm px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-1">Education</h2>
                <ul className="list-disc ml-6">
                    {Array.isArray(education) ? (
                        education.map((edu, i) => (
                            <li key={i}>
                                <span className="font-semibold">{edu.course}</span> – {edu.location}
                            </li>
                        ))
                    ) : (
                        <li>{education}</li>
                    )}
                </ul>
            </section>

            {certifications?.length > 0 && (
                <section className="mt-4">
                    <h2 className="text-xl font-semibold mb-1">Certifications</h2>
                    <ul className="list-disc ml-6">
                        {certifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                        ))}
                    </ul>
                </section>
            )}

            {achievements?.length > 0 && (
                <section className="mt-4">
                    <h2 className="text-xl font-semibold mb-1">Achievements</h2>
                    <ul className="list-disc ml-6">
                        {achievements.map((achieve, i) => (
                            <li key={i}>{achieve}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
export default ResumePreview;