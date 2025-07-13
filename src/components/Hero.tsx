"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import Particles from "@tsparticles/react";
import type {RecursivePartial, IOptions } from "@tsparticles/engine";



import {
  Github,
  Linkedin,
  Mail,
  Send,
  Code,
  ArrowDownCircle,
  FileText,
} from "lucide-react";

const particleOptions: RecursivePartial<IOptions> = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: { enable: true },
    },
    color: { value: ["#3b82f6", "#60a5fa", "#93c5fd"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.2,
    },
    size: {
      value: 3,
      // no random here
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none" as const,
      outModes: "bounce" as const,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};




const Typewriter = ({ texts }: { texts: string[] }) => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[i];
    const update = () => {
      if (isDeleting) {
        setText(current.substring(0, j - 1));
        setJ((prev) => prev - 1);
      } else {
        setText(current.substring(0, j + 1));
        setJ((prev) => prev + 1);
      }
    };

    const timeout = setTimeout(update, isDeleting ? 40 : 80);

    if (!isDeleting && j === current.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && j === 0) {
      setIsDeleting(false);
      setI((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [j, i, isDeleting, texts]);

  return (
    <span className="text-blue-600 dark:text-blue-400 font-semibold">
      {text}
      <span className="animate-blink">|</span>
      <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.2s step-end infinite;
        }
      `}</style>
    </span>
  );
};

export default function Hero() {
  const controls = useAnimation();

  // Rotate on mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    controls.start({
      rotateX: -y,
      rotateY: x,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
  }, [controls]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);



  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -112;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#e9f0f8] via-[#dbe7f3] to-[#c5def0] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e3a8a] flex flex-col px-4 sm:px-8 md:px-12 lg:px-24 pt-[88px] pb-24 sm:pb-28 md:pb-32"
    >
    <Particles
    options={particleOptions}
    className="absolute inset-0 -z-20 w-full h-full"
  />


      {/* Floating Icons */}
      <motion.img
        src="/react.svg"
        alt="React"
        className="absolute top-10 right-4 sm:top-20 sm:right-16 w-8 sm:w-10 md:w-12 opacity-80 dark:opacity-50"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />
      <motion.img
        src="/node.svg"
        alt="Node.js"
        className="absolute bottom-24 left-4 sm:bottom-32 sm:left-16 w-10 sm:w-12 md:w-14 opacity-70 dark:opacity-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />
      <motion.img
        src="/aws.svg"
        alt="AWS"
        className="absolute top-1/2 left-6 sm:left-12 w-12 sm:w-14 md:w-16 opacity-60 dark:opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />

      {/* Content */}
      <motion.div
        className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        {/* Left Section */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Mohammad</span>
          </motion.h1>

          <motion.p
            className="mt-2 text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-semibold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            4th-year Software Engineering Student at McMaster University
          </motion.p>

          <motion.p
            className="mt-4 text-xl text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I&apos;m{" "}
            <Typewriter
              texts={[
                "a Full-Stack Developer.",
                "a Cloud Architect.",
                "a Security Enthusiast.",
                "a Backend Engineer.",
                "a Problem Solver.",
              ]}
            />
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a href="#contact" className="group relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition transform hover:scale-105 inline-flex items-center gap-2 overflow-hidden">
              <span className="relative z-10">Contact Me</span>
              <Send size={18} className="relative z-10" />
              <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-full pointer-events-none" />
            </a>

            <a href="#projects" className="group relative border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 px-6 py-3 rounded-full font-medium transition transform hover:scale-105 inline-flex items-center gap-2 overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <Code size={18} className="relative z-10" />
              <span className="absolute inset-0 bg-blue-50 dark:bg-blue-800 opacity-0 group-hover:opacity-30 transition duration-300 rounded-full pointer-events-none" />
            </a>

            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group relative text-blue-600 dark:text-blue-300 border border-blue-600 dark:border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 px-6 py-3 rounded-full font-medium transition transform hover:scale-105 inline-flex items-center gap-2 overflow-hidden">
              <span className="relative z-10">Resume</span>
              <FileText size={18} className="relative z-10" />
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900 opacity-0 group-hover:opacity-30 transition duration-300 rounded-full pointer-events-none" />
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="mt-6 mb-8 flex flex-wrap justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <a href="https://github.com/mohamadAlhawameda" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition-transform duration-300">
              <Github size={28} className="text-gray-700 dark:text-gray-300" />
            </a>
            <a href="https://www.linkedin.com/in/mohammad-alhawamdeh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition-transform duration-300">
              <Linkedin size={28} className="text-gray-700 dark:text-gray-300" />
            </a>
            <a href="mailto:alhawameda4@gmail.com" aria-label="Email" className="hover:scale-110 transition-transform duration-300">
              <Mail size={28} className="text-gray-700 dark:text-gray-300" />
            </a>
          </motion.div>
        </div>

        {/* Image Section with fade-in and mouse-based rotation */}
        <motion.div
          className="relative w-36 sm:w-48 md:w-64 lg:w-72 aspect-square max-w-xs sm:max-w-full rounded-full overflow-hidden shadow-2xl border-4 border-blue-300 dark:border-blue-700 mx-auto mt-6 sm:mt-12 md:mt-16 lg:mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={controls}
            className="absolute inset-0 pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-blue-400 via-blue-300 to-transparent opacity-30 animate-pulse blur-2xl" />
          </motion.div>

          <Image
            src="/image.jpeg"
            alt="Mohammad Alhawamdeh"
            fill
            priority
            style={{ objectFit: "cover" }}
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Scroll Button */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 sm:bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 text-blue-600 dark:text-blue-400 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-30"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll down to About section"
      >
        <div className="relative flex items-center justify-center">
          <ArrowDownCircle size={36} className="z-10" />
          <span className="absolute w-12 h-12 rounded-full border-2 border-blue-400 dark:border-blue-600 animate-ping pointer-events-none" />
        </div>
      </motion.button>
    </section>
  );
}
