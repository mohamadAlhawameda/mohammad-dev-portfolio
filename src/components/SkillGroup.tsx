'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SkillBar from './SkillBar';

interface SkillGroupProps {
  category: string;
  skills: string[];
  defaultOpen?: boolean;
}

export default function SkillGroup({ category, skills, defaultOpen = false }: SkillGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {category}
        </span>
        {open ? (
          <ChevronUp className="text-blue-500" size={20} />
        ) : (
          <ChevronDown className="text-blue-500" size={20} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden mt-3"
          >
            {skills.map((skill) => (
              <SkillBar key={skill} skill={skill} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
