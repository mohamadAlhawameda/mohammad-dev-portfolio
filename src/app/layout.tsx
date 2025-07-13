import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mohammad Alhawamdeh | Software Developer',
  description:
    'Professional portfolio of Mohammad Alhawamdeh, showcasing skills, experience, and projects in software development.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
     <body className="bg-white text-gray-900 font-sans overflow-x-hidden">
  <div className="flex flex-col min-h-screen overflow-x-hidden">
    <Navbar />
    <main className="flex-grow">{children}</main>
  </div>
</body>

    </html>
  );
}
