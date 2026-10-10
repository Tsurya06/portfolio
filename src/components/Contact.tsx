import { useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';
import { Github, Twitter, Dribbble } from './icons/BrandIcons';
import SectionHeading from './SectionHeading';
import { Reveal } from './motion/Reveal';
import { personalInfo } from '@/data/portfolio';
import { sendContactEmail } from '@/services/mailService';

const socialIcons: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
};

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');
    setFeedback('');

    try {
      const res = await sendContactEmail(form);
      if (res.success) {
        setStatus('sent');
        setFeedback(res.message);
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        });

        if (res.fallbackMailto) {
          window.location.href = res.fallbackMailto;
        }

        setTimeout(() => {
          setStatus('idle');
          setFeedback('');
        }, 5000);
      } else {
        setStatus('error');
        setFeedback(res.message);
        setTimeout(() => {
          setStatus('idle');
        }, 6000);
      }
    } catch {
      setStatus('error');
      setFeedback('Failed to send message. Please reach out directly via email.');
      setTimeout(() => {
        setStatus('idle');
      }, 6000);
    }
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
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'var(--accent-glow)' }}
      />

      <SectionHeading
        number="05"
        title="Get In Touch"
        subtitle="Have a question, a project, an opportunity, or just want to say hi? Feel free to reach out!"
      />

      <div className="grid md:grid-cols-5 gap-8 relative z-10">
        {/* Left: Contact Info */}
        <Reveal className="md:col-span-2" x={-30}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 w-fit"
            style={{
              background: 'rgba(0, 212, 170, 0.12)',
              border: '1px solid rgba(0, 212, 170, 0.3)',
              color: 'var(--accent)',
            }}
          >
            <span className="w-2 h-2 rounded-full status-dot" style={{ background: 'var(--accent)' }} />
            Open for Opportunities
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-0)' }}>
            Let's build something <span className="gradient-text">exceptional</span> together.
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-1)', lineHeight: 1.7 }}>
            I'm always interested in hearing about new opportunities, innovative projects, or exciting engineering challenges. Drop me a message and I'll get back to you as soon as possible.
          </p>

          {/* Direct Email Card */}
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl surface mb-3 group"
            whileHover={{ x: 4, borderColor: 'var(--accent)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent)', color: 'var(--bg-0)' }}
            >
              <Mail size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-2)' }}>
                Email
              </div>
              <div className="text-xs font-medium truncate" style={{ color: 'var(--text-0)' }}>
                {personalInfo.email}
              </div>
            </div>
            <Sparkles size={14} className="ml-auto flex-shrink-0" style={{ color: 'var(--accent)' }} />
          </motion.a>

          {/* Location Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl surface mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--blue)', color: 'white' }}
            >
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-2)' }}>
                Location
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-0)' }}>
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Social Links */}
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                  whileHover={{ y: -3, color: 'var(--accent)', borderColor: 'var(--accent)', scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>
        </Reveal>

        {/* Right: Clean, Simple Contact Form */}
        <Reveal className="md:col-span-3" delay={0.15} x={30}>
          <form onSubmit={handleSubmit} className="surface p-6 md:p-8 space-y-4 rounded-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-3)' }} />

            {/* Name and Email side-by-side */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-1)' }}>
                  Name <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-1)' }}>
                  Email <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-1)' }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this regarding?"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-1)' }}>
                Message <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Your message here..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-semibold relative overflow-hidden transition-colors mt-2"
              style={{
                background: status === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'var(--accent)',
                color: 'var(--bg-0)',
              }}
              whileHover={{ scale: status === 'idle' ? 1.01 : 1, boxShadow: '0 10px 40px var(--accent-glow)' }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    className="flex items-center gap-2 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span
                    key="sending"
                    className="flex items-center gap-2 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <motion.span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--bg-0)' }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                      ))}
                    </motion.span>
                    <span>Sending...</span>
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span
                    key="sent"
                    className="flex items-center gap-2 font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Message Sent!</span>
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span
                    key="error"
                    className="flex items-center gap-2 font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle size={16} />
                    <span>Failed to Send — Click to Retry</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Status feedback message */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="p-3 rounded-xl text-xs flex items-start gap-2 leading-relaxed"
                  style={{
                    background: status === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(0, 212, 170, 0.12)',
                    border: `1px solid ${status === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0, 212, 170, 0.3)'}`,
                    color: status === 'error' ? '#fca5a5' : 'var(--accent)',
                  }}
                >
                  {status === 'error' ? <AlertCircle size={14} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={14} className="shrink-0 mt-0.5" />}
                  <span>{feedback}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
