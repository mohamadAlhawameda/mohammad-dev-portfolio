'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface SkillBarProps {
  skill: string;
}

export default function SkillBar({ skill }: SkillBarProps) {
  const [fill, setFill] = useState(0);
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);
  const [displayedPercent, setDisplayedPercent] = useState(0);

  useEffect(() => {
    const target = 75 + Math.floor(Math.random() * 20); // Simulated 75–95% skill
    setFill(target);

    // Smooth count-up
    let start = 0;
    const increment = () => {
      if (start < target) {
        start += 1;
        setDisplayedPercent(start);
        requestAnimationFrame(increment);
      } else {
        setDisplayedPercent(target);
      }
    };
    increment();

    // Glowing animated effect
    controls.start({
      boxShadow: [
        '0 0 8px rgba(59, 130, 246, 0.5)',
        '0 0 14px rgba(59, 130, 246, 0.8)',
        '0 0 8px rgba(59, 130, 246, 0.5)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [controls]);

  return (
    <motion.div
      role="listitem"
      tabIndex={0}
      aria-label={`${skill} proficiency approximately ${displayedPercent} percent`}
      className="mb-6 focus:outline-none group"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
          {skill}
        </span>
        <AnimatePresence>
          {hovered && (
            <motion.span
              className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded shadow-lg pointer-events-none"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Proficiency: {displayedPercent}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        className="relative w-full h-5 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 top-0 h-5 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
          style={{ width: `${fill}%` }}
          animate={controls}
          whileHover={{ scale: 1.015, rotate: 0.3 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Shine shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* % label inside bar */}
        <motion.span
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white drop-shadow select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          {displayedPercent}%
        </motion.span>
      </div>
    </motion.div>
  );
}
