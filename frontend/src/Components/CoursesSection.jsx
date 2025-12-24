import { motion } from 'framer-motion';
import {
  BookOpen,
  IndianRupee,
  ExternalLink,
  CircleArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.45 },
  }),
};

function CoursesSection() {

  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const courseFetch = async () => {
    const { data, error } = await supabase.from('resources').select('*').limit(3);
    if (error) { console.log(error); return; } setCourses(data);
  }
  useEffect(() => {
    courseFetch();
  }, []);

  return (
    <section
      className={`py-10 px-6 ${darkMode
        ? 'bg-black text-white'
        : 'bg-gradient-to-br from-yellow-50 via-green-50 to-white'
        }`}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-green-500 text-transparent bg-clip-text">
          Upskill with Curated Courses
        </h2>
        <p
          className={`mt-3 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
        >
          Learn from trusted instructors and gain skills that actually convert into opportunities.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map((item, idx) => {
          // const original = Number(item.originalprice);
          // const sale = Number(item.sellprice);
          // const discount =
          //   original && sale
          //     ? Math.round(((original - sale) / original) * 100)
          //     : 0;

          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              className="relative group h-full"
            >
              {/* Glow Border */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-yellow-300 via-green-300 to-emerald-400 opacity-25 blur group-hover:opacity-50 transition" />

              {/* Card */}
              <div
                className={`relative rounded-3xl p-5 border backdrop-blur-xl h-full flex flex-col
      ${darkMode
                    ? 'bg-gray-900/85 border-gray-700'
                    : 'bg-white/85 border-gray-200'
                  }
      shadow-sm group-hover:shadow-2xl transition-all`}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  {/* Featured badge ON image */}
                  <span className="absolute top-1 right-1 z-10 text-xs font-semibold px-3 py-1 rounded-full
                       bg-green-400 text-gray-900 shadow">
                    Featured
                  </span>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-lg font-semibold leading-snug mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                  >
                    {item.description}
                  </p>

                  {/* Instructor */}
                  <p className="text-sm mb-6">
                    <span className="font-medium text-green-500">
                      Instructor:
                    </span>{' '}
                    {item.author}
                  </p>

                  {/* CTA pinned to bottom */}
                  <a
                    href={item.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                   bg-yellow-400 hover:bg-yellow-300
                   text-gray-900 font-semibold
                   shadow-md hover:shadow-lg transition"
                  >
                    View Course
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View More */}
      <div className="mt-14 flex justify-center">
        <Link
          to="/resources"
          className="flex items-center gap-2 px-7 py-3 rounded-xl
                     bg-gradient-to-r from-yellow-500 to-green-500
                     text-gray-900 font-semibold shadow-lg
                     hover:scale-105 transition"
        >
          <BookOpen size={18} />
          View all resources
          <CircleArrowRight />
        </Link>
      </div>
    </section>
  );
}
export default CoursesSection;