import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

function Frontend() {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState(`
Give me a step-by-step roadmap to become a Frontend Developer. Return it strictly as a pure JSON array of objects. 
Each object should contain: 
- "step" (number), 
- "title" (string), 
- "description" (string) with topic . 
- "link" (string) best resourses
Do NOT include any variable declarations or explanation text.
`);
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const fetchGemini = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini`, {
                    prompt: prompt,
                });

                let cleaned = res.data.response;

                if (cleaned.startsWith("```json")) {
                    cleaned = cleaned.replace(/```json\s*|\s*```/g, '');
                }

                const parsed = JSON.parse(cleaned);
                setResponse(parsed);
            } catch (err) {
                console.error(err);
                setResponse([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGemini();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-4">
                    Frontend Developer Roadmap
                </h1>
                <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
                    A carefully crafted step-by-step journey to becoming a proficient Frontend Developer. Explore topics, master skills, and access the best learning resources.
                </p>

                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-lg text-gray-500 text-center mb-4">
                            Preparing Roadmap for Frontend Developer...
                        </p>
                        <Spin size="large" />
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {response.map((item) => (
                            <div
                                key={item.step}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100"
                            >
                                <div className="p-6 space-y-3">
                                    <div className="flex items-center gap-2 text-blue-500 font-medium text-sm">
                                        <BookOpen className="w-4 h-4" />
                                        Step {item.step}
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="px-6 pb-6">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full font-medium"
                                    >
                                        Read Resource
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Frontend;