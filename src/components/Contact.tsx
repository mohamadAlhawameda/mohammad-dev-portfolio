'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, Calendar } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error, please try again later');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-28 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 px-6 sm:px-12 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="flex items-center gap-3 text-4xl font-extrabold text-gray-900 dark:text-white mb-14">
          <Mail className="text-blue-600" size={36} /> Contact Me
        </h2>

        {/* Schedule Meeting Button */}
       {/* Schedule Meeting Button */}
        <div className="mb-12 flex justify-center">
          <button
            onClick={() => setCalendlyOpen(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            <Calendar size={20} /> Schedule a Meeting
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Contact Info */}
          <div className="md:w-1/3 space-y-6 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Feel free to reach out for collaborations, project ideas, or just to say hello.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" size={22} />
                <a href="mailto:alhawameda4@gmail.com" className="hover:underline">
                  alhawameda4@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" size={22} />
                <a href="tel:+16477394894" className="hover:underline">
                  +1 (647) 739-4894
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-blue-600" size={22} />
                <a
                  href="https://linkedin.com/in/mohammad-alhawamdeh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/mohammad-alhawamdeh
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="text-blue-600" size={22} />
                <a
                  href="https://github.com/mohamadAlhawameda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  github.com/mohamadAlhawameda
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="md:w-2/3 flex flex-col gap-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              rows={6}
              placeholder="Your Message"
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'loading'}
              className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-6 py-3 transition shadow-md ${
                status === 'loading'
                  ? 'bg-blue-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} />
            </motion.button>

            {status === 'success' && (
              <p className="text-green-600 font-medium mt-4">Thanks for your message! I&apos;ll get back soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 font-medium mt-4">Oops! {errorMessage}</p>
            )}
          </form>
        </div>
      </motion.div>

       {/* Calendly Modal */}
      <AnimatePresence>
        {calendlyOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 w-[90%] max-w-3xl shadow-2xl relative"
            >
              <button
                onClick={() => setCalendlyOpen(false)}
                className="absolute top-4 right-4 text-black dark:text-white text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <iframe
                src="https://calendly.com/websolarch/30min"
                className="w-full h-[500px] sm:h-[600px] rounded-xl"
                frameBorder="0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
