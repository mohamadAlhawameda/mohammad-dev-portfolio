'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import SkillGroup from './SkillGroup';

const skillsData = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'React Native', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express', 'Spring Boot', 'Django', 'REST APIs', '.NET Core', 'C#', 'Java', 'Python'],
  Cloud: ['AWS EC2', 'S3', 'RDS', 'Docker', 'CI/CD'],
  Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQL/PLSQL', 'Apache Hive', 'Apache Pig', 'Spark', 'Tableau'],
  Tools: ['Git & GitHub', 'Jira', 'Postman', 'VS Code', 'Agile/Scrum'],
  Security: ['TLS/SSL', 'JWT', 'CSRF/XSS Prevention', 'Auth0', 'Encryption/Decryption', 'Socket Programming'],
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

export default function About() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [typedText, setTypedText] = useState('');
  const headline = 'Versatile Software Developer | Full-Stack & Security Focused';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(headline.slice(0, index + 1));
      index++;
      if (index === headline.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 bg-white dark:bg-gray-900 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      {/* Floating background shapes */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 dark:bg-indigo-800 rounded-full opacity-20 translate-x-1/3 -translate-y-1/3 blur-2xl pointer-events-none"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <SectionTitle title="About Me" icon={<User size={32} />} />

      {/* Typing title animation */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70 }}
        className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 min-h-[3rem]"
      >
        {typedText}
        <span className="inline-block w-1 h-7 bg-blue-600 dark:bg-blue-400 animate-pulse ml-1" />
      </motion.h3>

      {/* Paragraphs with scroll animations */}
      <div className="max-w-4xl mx-auto space-y-6 mb-16 text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
        {[
          `I'm a driven software developer with a passion for creating efficient, scalable, and impactful digital solutions.`,
          `I have experience building full-stack applications, integrating cloud services, and maintaining systems with a focus on performance and usability.`,
          `I also bring hands-on knowledge in basic networking and security concepts, including encryption/decryption, socket programming, and secure authentication techniques such as JWT and Auth0.`,
          `I'm familiar with modern security standards and practices such as TLS/SSL, CSRF/XSS prevention, and API protection—ensuring the applications I build are not just functional, but secure by design.`,
          `Every day, I aim to push my understanding further by exploring new technologies, learning from challenges, and collaborating with teams to solve real-world problems.`,
        ].map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Skills with card animations */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12 mb-20">
        {Object.entries(skillsData).map(([category, skills]) => (
          <SkillGroup
            key={category}
            category={category}
            skills={skills}
            defaultOpen={category === 'Frontend' || category === 'Backend'}
          />
        ))}
      </div>

      {/* Expandable philosophy with fade & height animation */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setShowPhilosophy(!showPhilosophy)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded hover:underline"
        >
          {showPhilosophy ? (
            <>
              <ChevronUp size={20} /> Hide My Philosophy
            </>
          ) : (
            <>
              <ChevronDown size={20} /> Show My Philosophy
            </>
          )}
        </button>
        <AnimatePresence>
          {showPhilosophy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed border-l-4 border-blue-600 pl-4"
            >
              <p>
                I believe technology should be empowering, intuitive, and secure. Whether working on the frontend, backend, or infrastructure layer, I strive to write code that&apos;s clean, tested, and maintainable.
                <br />
                I take security seriously from the very beginning of any project, building with a mindset that values both resilience and user trust. I&apos;m constantly learning, because the field is constantly evolving—and that&apos;s what excites me most about it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
