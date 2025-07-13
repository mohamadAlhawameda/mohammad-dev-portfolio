'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-6 sm:px-12 lg:px-24 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-gray-700 dark:text-gray-300 text-sm font-medium">
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
        
          <a href="#projects" className="hover:text-blue-600 transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-blue-600 transition">
            Contact
          </a>
        </nav>

        {/* Right - Social Icons */}
        <div className="flex gap-6 justify-center">
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://twitter.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <Twitter size={24} />
          </a>
          <a
            href="mailto:your.email@example.com"
            aria-label="Email"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Mia Ahmad. All rights reserved.
      </div>
    </footer>
  );
}
