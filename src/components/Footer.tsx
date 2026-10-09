import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Linkedin, Mail } from 'lucide-react';
import { Github, Twitter, Dribbble } from './icons/BrandIcons';
import { personalInfo } from '@/data/portfolio';

const socialIcons: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-12 px-6 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full blur-[100px]"
        style={{ background: 'var(--accent-glow)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 font-mono text-lg font-bold"
            style={{ color: 'var(--text-0)' }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
              style={{ background: 'var(--gradient-1)', color: 'var(--bg-0)' }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              S
            </motion.span>
            surya<span style={{ color: 'var(--accent)' }}>.dev</span>
          </motion.button>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {personalInfo.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Github;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                  whileHover={{ y: -4, color: 'var(--accent)', borderColor: 'var(--accent)', scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs flex items-center gap-1.5 font-mono" style={{ color: 'var(--text-2)' }}>
            © {new Date().getFullYear()} {personalInfo.name} · built with
            <Heart size={12} fill="currentColor" style={{ color: 'var(--rose)' }} />
            React + TypeScript
          </p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono"
            style={{ color: 'var(--text-1)' }}
            whileHover={{ y: -2, color: 'var(--accent)' }}
          >
            back to top
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowUp size={14} />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
