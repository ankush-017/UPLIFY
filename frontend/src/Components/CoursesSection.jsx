import { motion } from 'framer-motion';
import { BookOpen, Flame, Target, Lightbulb,CircleArrowRight} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const courses = [
  {
    title: 'Web Development Bootcamp',
    desc: 'Master HTML, CSS, JS & React. Learn from scratch with real projects.',
    icon: <Flame className="text-blue-600" size={26} />,
    link: 'https://www.udemy.com/course/the-web-developer-bootcamp/?referralCode=UPLIFY123',
  },
  {
    title: 'Digital Marketing Mastery',
    desc: 'Learn SEO, Google Ads, Instagram strategy, email marketing and more.',
    icon: <Target className="text-blue-600" size={26} />,
    link: 'https://www.coursera.org/specializations/digital-marketing?utm_source=uplify',
  },
  {
    title: 'UI/UX Design Essentials',
    desc: 'Master Figma, wireframes, user flows, and beautiful interface design.',
    icon: <Lightbulb className="text-blue-600" size={26} />,
    link: 'https://www.udemy.com/course/ui-ux-design/?referralCode=UPLIFY123',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

function CoursesSection() {

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className={`py-14 px-6 ${darkMode?"bg-gray-950":"bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold ${darkMode?"text-gray-200":"text-gray-900"} mb-4`}
        >
          Upskill with Curated Courses
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className={`${darkMode?"text-gray-400":"text-gray-600"}  mb-12`}
        >
          Gain in-demand skills with courses from our learning partners. Learn faster, grow smarter.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {courses.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              className={`${darkMode?"bg-black border-gray-600":"bg-white border-gray-200"}  hover:shadow-lg border p-6 rounded-lg transition-all duration-300 flex flex-col gap-4`}
            >
              <div className="bg-blue-100 w-fit p-3 rounded-full">{item.icon}</div>
              <h3 className={`text-lg font-semibold ${darkMode?"text-gray-200":"text-gray-800"}`}>{item.title}</h3>
              <p className={`${darkMode?"text-gray-400":"text-gray-600"} text-sm`}>{item.desc}</p>
              <span className="text-blue-600 font-medium text-sm mt-2">Explore Course →</span>
            </motion.a>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/resources"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <BookOpen size={20} className="text-white" />
            <span className="font-semibold">View More Resources</span>
            <CircleArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
export default CoursesSection;