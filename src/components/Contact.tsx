import { useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, CheckCircle2, Sparkles } from 'lucide-react';
import { Github, Twitter, Dribbble } from './icons/BrandIcons';
import SectionHeading from './SectionHeading';
import { Reveal } from './motion/Reveal';
import { personalInfo } from '@/data/portfolio';

const socialIcons: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
};

type FormState = { name: string; email: string; message: string };
type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    color: 'var(--text-0)',
  };

  return (
    <section id="contact" className="section-pad max-w-5xl mx-auto relative">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px]"
        style={{ background: 'var(--accent-glow)' }}
      />

      <SectionHeading number="05" title="Get In Touch" subtitle="Have a project in mind or want to collaborate? Let's talk." />

      <div className="grid md:grid-cols-5 gap-8 relative z-10">
        {/* Left: Info + CTA */}
        <Reveal className="md:col-span-2" x={-30}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-0)' }}>
            Let's build something{' '}
            <span className="gradient-text">amazing</span> together.
          </h3>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-1)', lineHeight: 1.7 }}>
            I'm currently {personalInfo.availability.toLowerCase()}. Whether you have a project idea, a role to fill, or just want to connect — I respond within 24 hours.
          </p>

          {/* Email card */}
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-3 p-4 rounded-2xl surface mb-3 group"
            whileHover={{ x: 4, borderColor: 'var(--accent)' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent)', color: 'var(--bg-0)' }}
            >
              <Mail size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-2)' }}>
                Email Me
              </div>
              <div className="text-sm font-medium truncate" style={{ color: 'var(--text-0)' }}>
                {personalInfo.email}
              </div>
            </div>
            <Sparkles size={15} className="ml-auto flex-shrink-0" style={{ color: 'var(--accent)' }} />
          </motion.a>

          {/* Location */}
          <div className="flex items-center gap-3 p-4 rounded-2xl surface mb-6">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--blue)', color: 'white' }}
            >
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-2)' }}>
                Based In
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-0)' }}>
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2.5">
            {personalInfo.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Github;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                  whileHover={{ y: -4, color: 'var(--accent)', borderColor: 'var(--accent)', scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </Reveal>

        {/* Right: Form */}
        <Reveal className="md:col-span-3" delay={0.15} x={30}>
          <form onSubmit={handleSubmit} className="surface p-6 md:p-7 space-y-5 relative overflow-hidden">
            {/* Gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-3)' }} />

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-1)' }}>
                $ your name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-mono"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-1)' }}>
                $ your email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-mono"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-1)' }}>
                $ your message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or role..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-mono resize-none"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-semibold relative overflow-hidden"
              style={{ background: 'var(--accent)', color: 'var(--bg-0)' }}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1, boxShadow: '0 10px 40px var(--accent-glow)' }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Send size={15} />
                    Send Message
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span key="sending" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <motion.span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--bg-0)' }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                      ))}
                    </motion.span>
                    Sending...
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span key="sent" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <CheckCircle2 size={16} />
                    Message Sent! I'll get back to you soon.
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
