import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Who provides the certificates?',
    answer: 'Certificates are issued by the companies that post the internships. Uplify helps you verify them easily.',
  },
  {
    question: 'Is Uplify free to use?',
    answer: 'Yes! Students can explore internships, apply, and build resumes completely free.',
  },
  {
    question: 'How do companies post internships?',
    answer: 'Verified companies can register on Uplify and post internships through their dashboard.',
  },
  {
    question: 'Do I need to complete a course to apply?',
    answer: 'No. Courses are optional and help you upskill, but you can apply without them.',
  },
  {
    question: 'How long are the internships?',
    answer: 'Each internship duration is listed on its card. They usually range from 1 to 6 months.',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-gradient-to-br from-[#2e4781] via-[#0c1b2c] to-[#220909] text-green-400 py-14 px-6 relative overflow-hidden">
      {/* Optional soft glow behind heading */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-blue-500 opacity-10 blur-3xl z-0" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl pb-2 font-bold bg-gradient-to-r from-green-400 to-yellow-500 text-transparent bg-clip-text mb-8"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="text-left space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#131c31] border border-[#1f2c40] rounded-md p-4 hover:border-green-500 transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => toggle(i)}
              >
                <span className="text-gray-300 font-medium">{faq.question}</span>
                <ChevronDown
                  className={`text-green-400 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-sm text-yellow-300 mt-2"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FaqSection;