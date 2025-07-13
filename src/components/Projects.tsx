'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SparklesCore } from './sparkles';
const projectsData = [
  {
    id: 1,
    title: 'Resume AI Builder',
    description:
      'AI-powered resume builder that helps users create professional resumes effortlessly with smart suggestions and easy editing.',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'AI API'],
    repoUrl: 'https://github.com/mohamadAlhawameda/resume-ai-builder',
  },
  {
    id: 2,
    title: 'Grade Submission API',
    description:
      'A secure and RESTful API to manage student grades with Spring Boot, JWT authentication, and robust exception handling.',
    techStack: ['Java', 'Spring Boot', 'JWT', 'Spring Security'],
    repoUrl: "https://github.com/mohamadAlhawameda/Grade-Submission"
  },
  {
    id: 3,
    title: 'Client-Server Chat App',
    description:
      'A real-time chat application with secure SSL implementation using Python, Django, and Socket Library.',
    techStack: ['Python', 'Django', 'Socket', 'SSL'],
    repoUrl: "https://github.com/mohamadAlhawameda/Client-Server-Chat-application"
  },
  {
    id: 4,
    title: 'Workout Tracker',
    description:
      'Track running and cycling workouts with geolocation, Leaflet.js maps, and localStorage-based data persistence.',
    techStack: ['JavaScript', 'Leaflet.js', 'Geolocation API', 'localStorage'],
    repoUrl:"https://github.com/mohamadAlhawameda/Workout-Tracker-Application"
  },
  {
    id: 5,
    title: 'CareTrack Network',
    description:
      'A healthcare network management app using ASP.NET MVC and Entity Framework with multiple models and controller logic.',
    techStack: ['C#', 'ASP.NET MVC', 'Entity Framework'],
    repoUrl:"https://github.com/mohamadAlhawameda/CareTrack-Network"
  },
];

const allTags = Array.from(
  new Set(projectsData.flatMap((project) => project.techStack))
).sort();

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projectsData.filter((project) => project.techStack.includes(selectedTag))
    : projectsData;

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Animated sparkles background */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore 
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#60a5fa"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12 relative z-10">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Projects Showcase
          </motion.span>
        </h2>

        {/* Tags Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center relative z-10">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1 rounded-full border font-medium transition duration-200 ease-in-out shadow-sm ${
              selectedTag === null
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1 rounded-full border font-medium transition duration-200 ease-in-out shadow-sm ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-md hover:shadow-2xl transition-all duration-300 group"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full px-3 py-1 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="mt-4 flex gap-4">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm font-semibold"
                    >
                      GitHub <ExternalLink size={16} />
                    </a>
                  )}
                 
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
