'use client';

import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  icon: ReactNode;
}

export default function SectionTitle({ title, icon }: SectionTitleProps) {
  return (
    <div className="flex items-center mb-12 select-none">
      <div className="text-blue-600 dark:text-blue-400 mr-3">{icon}</div>
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">{title}</h2>
    </div>
  );
}
