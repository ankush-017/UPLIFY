import { motion } from 'framer-motion';
import { BookOpen, Flame, Target, Lightbulb,CircleArrowRight, IndianRupee, ExternalLink} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

function CoursesSection() {

  const [courses,setCourses] = useState([]);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const courseFetch = async () => {
     const {data,error} = await supabase.from('resources').select('*').limit(3);
     if(error){
      console.log(error);
      return;
     }
     setCourses(data);
  }
  useEffect(()=>{
    courseFetch();
  },[]);

  return (
    <section className={`py-14 px-6 ${darkMode?"bg-gray-950":"bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold ${darkMode?"text-blue-400":"text-blue-700"} mb-3`}
        >
          Upskill with Curated Courses
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className={`${darkMode?"text-gray-300":"text-gray-700"}  mb-5`}
        >
          Gain in-demand skills with courses from our learning partners. Learn faster, grow smarter.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {courses.map((item) => {
          const original = Number(item.originalprice);
          const sale = Number(item.sellprice);
          const discount =
            original && sale
              ? Math.round(((original - sale) / original) * 100)
              : 0;

          return (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className={`text-xl font-semibold mb-1 ${darkMode?"text-cyan-400":"text-cyan-700"}`}>
                {item.title}
              </h2>
              <p className={`text-sm mb-2 ${darkMode?"text-gray-300":"text-gray-800"}`}>
                {item.description}
              </p>
              <p className={`text-sm ${darkMode?"text-gray-400":"text-gray-700"} mb-1 font-semibold `}>
                <span className={`font-bold ${darkMode?"text-blue-400":"text-blue-700"}`}>Instructor:</span> {item.author}
              </p>
              <p className={`text-sm ${darkMode?"text-gray-400":"text-gray-800"} mb-3 flex items-center `}>
                <IndianRupee size={14} className={`${darkMode?"text-gray-400":"text-gray-700"}`} />
                <span className={`line-through ${darkMode?"text-red-400":"text-red-700"}`}>{item.originalprice}</span>
                <span className={`${darkMode?"text-gray-100":"text-gray-900"}`}>→</span>
                <IndianRupee size={14} className={`${darkMode?"text-gray-300":"text-gray-600"}`} />
                <span className={`${darkMode?"text-green-400":"text-green-700"} font-semibold text-base`}>{item.sellprice}</span>
                {discount > 0 && (
                  <span className={`ml-auto px-2 py-0.5 rounded-md text-xs ${darkMode?"bg-green-700/30 text-green-300":"bg-green-600 text-white"}`}>
                    {discount}% OFF
                  </span>
                )}
              </p>
              <a
                href={item.courseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm ${darkMode?"text-cyan-300":"text-cyan-600"} hover:underline`}
              >
                View Course <ExternalLink size={16} />
              </a>
            </div>
          );
        })}
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