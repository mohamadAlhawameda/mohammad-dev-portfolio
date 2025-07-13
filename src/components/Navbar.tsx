'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const NAVBAR_HEIGHT = 64; // px, adjust if your navbar height changes

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // prevent background scroll when menu open
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // restore scroll
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Update active section and sticky navbar state on scroll
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.substring(1));
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      setIsSticky(window.scrollY > 10);

      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to sections with offset and close menu
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - NAVBAR_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Close menu after small delay to let scroll begin
        setTimeout(() => setIsOpen(false), 300);
      } else {
        setIsOpen(false);
      }
    }
  };

  // Dynamic navbar background class
  const navbarBgClass = isSticky
    ? 'bg-gradient-to-r from-[#f4f7fa]/80 via-[#e9f0f8]/80 to-[#dbe7f3]/80 dark:from-[#0f172a]/90 dark:via-[#1e293b]/90 dark:to-[#1e40af]/90 shadow-md border-b border-blue-100/40 dark:border-blue-900/40'
    : 'bg-gradient-to-r from-[#f4f7fa]/70 via-[#e9f0f8]/70 to-[#dbe7f3]/70 dark:from-[#0f172a]/70 dark:via-[#1e293b]/70 dark:to-[#1e40af]/70';

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-300 ${navbarBgClass}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
      <Link
  href="/"
  className="text-2xl font-extrabold tracking-tight text-blue-600 hover:text-blue-700 transition-colors select-none"
  aria-label="Homepage"
>
  Mohammad
  <span className="text-blue-400 dark:text-blue-300 font-semibold tracking-wide ml-1">.dev</span>
</Link>


        {/* Desktop Nav */}
        <nav
          className="hidden md:flex space-x-6 items-center text-sm font-medium"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className={`relative px-3 py-2 transition-colors duration-200 rounded-md font-medium
              ${
                activeSection === href.substring(1)
                  ? 'text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 font-semibold'
                  : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100/40 dark:hover:bg-blue-800/30'
              }`}
              aria-current={activeSection === href.substring(1) ? 'page' : undefined}
            >
              {label}
              {activeSection === href.substring(1) && (
                <motion.span
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-600 hover:text-blue-700 focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu and Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className={`fixed inset-0 z-40 ${navbarBgClass} backdrop-blur-md`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Dropdown Menu */}
            <motion.nav
              key="mobile-menu"
              id="mobile-menu"
              ref={menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`md:hidden fixed top-16 right-0 left-0 z-50 border-t border-blue-100 dark:border-blue-900 shadow-lg rounded-b-lg max-h-[calc(100vh-4rem)] overflow-auto bg-gradient-to-br from-[#f4f7fa] via-[#e9f0f8] to-[#dbe7f3] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e40af]`}
            >
              <div className="flex flex-col px-6 py-4 space-y-3">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className={`block px-4 py-2 rounded-lg font-medium transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                      activeSection === href.substring(1)
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                    aria-current={activeSection === href.substring(1) ? 'page' : undefined}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
