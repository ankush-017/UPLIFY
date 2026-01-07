export default {
    firstName: 'Ankush',
    lastName: 'Kumar',
    jobTitle: 'Full Stack Developer',
    address: 'Noida, Uttar Pradesh',
    phone: '+91 8076131654',
    email: 'ankush.dev@example.com',
    themeColor: "#43923c",
    summary: 'High-energy developer with 5+ years of experience in building scalable web applications. Passionate about clean code, performance optimization, and mentoring junior developers in modern JavaScript frameworks.',

    experience: [
        {
            id: 1,
            title: 'Full Stack Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2021',
            endDate: 'Apr 2022',
            currentlyWorking: false,
            // Plain text bullets using \n for line breaks
            workSummary: '• Implemented responsive user interfaces with various devices and browsers.\n' +
                         '• Maintaining the React Native in-house organization.\n' +
                         '• Created RESTful APIs with Node.js and Express for back-end systems.'
        }
    ],
    education: [
        {
            id: 1,
            universityName: 'Madan Mohan Malaviya University of Technology',
            startDate: 'Aug 2023',
            endDate: 'July 2027',
            degree: 'Bachelor of Technology',
            major: 'Computer Science',
            city: 'Gorakhpur',
            state: 'Uttar Pradesh',
            gpa: ' 9.5 / 10.00',
            // Simple plain text for education
            description: '• Pursuing specialization in Software Engineering and Advanced Algorithms.\n' +
                         '• Participated in various technical hackathons and coding competitions.'
        }
    ],
    skills: [
        {
            id: 1,
            category: 'Strong Areas',
            skillsList: 'Data Structure and Algorithms'
        },
        {
            id: 2,
            category: 'Programming',
            skillsList: 'C/C++, Python, Java, JavaScript, SQL, HTML/CSS, TypeScript'
        },
        {
            id: 3,
            category: 'Frameworks & Technologies',
            skillsList: 'Node.js, Express.js, React.js, Next.js, Redux, MongoDB, Tailwind'
        },
        {
            id: 4,
            category: 'Tools and IDEs',
            skillsList: 'Git/GitHub, WebSocket, VS Code'
        }
    ],
    achievements: [
        {
            id: 1,
            // Title is kept as an empty string or removed to match your "not give title" request
            description: 
                '• LeetCode: Solved 500+ problems | Max Rating: 1850 (Top 5%) | @james_carter\n' +
                '• Codeforces: Rating: 1620 (Specialist) | 30+ Contests | @carter_codes\n' +
                '• GeeksforGeeks: 200+ DSA Problems | Monthly Rank: #42 | @jcarter99\n' +
                '• Knight Badge on LeetCode (Top 5% globally) & Gold Badge in Problem Solving on HackerRank.\n' +
                '• 100+ Days Coding Streak Badge on LeetCode (2024) & Google HashCode Participant.\n' +
                '• Secured 1st Rank in Annual University Coding Hackathon (MMMUT) among 50+ teams.\n' +
                '• Awarded "Performance Excellence" in Software Engineering and Advanced Algorithms.\n' +
                '• Top 1% in National Engineering Entrance Test (JEE) among 1.2M+ students.'
        }
    ],
    projects: [
        {
            id: 1,
            projectName: 'E-commerce Platform',
            technologies: 'React, Redux, Stripe API',
            description: '• Built a full-featured online store with secure user authentication.\n' +
                         '• Optimized front-end performance reducing page load time by 30%.',
            github: '#'
        },
        {
            id: 2,
            projectName: 'Task Management Tool',
            technologies: 'Next.js, Firebase',
            description: '• Developed a real-time collaborative tool for teams to track project progress using Firebase.\n' +
                         '• Implemented drag-and-drop functionality for task assignment.',
            github: '#'
        }
    ]
}