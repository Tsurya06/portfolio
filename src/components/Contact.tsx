import { useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, CheckCircle2, AlertCircle, Sparkles, Briefcase, Building2 } from 'lucide-react';
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

const OPPORTUNITY_TYPES = [
  'Full-Time Role',
  'Contract / Project',
  'Technical Lead',
  'General Inquiry',
] as const;

type OpportunityType = (typeof OPPORTUNITY_TYPES)[number];

interface FormState {
  name: string;
  email: string;
  company: string;
  opportunityType: OpportunityType;
  message: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    opportunityType: 'Full-Time Role',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

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
          company: '',
          opportunityType: 'Full-Time Role',
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
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px]"
        style={{ background: 'var(--accent-glow)' }}
      />

      <SectionHeading
        number="05"
        title="Opportunities & Connect"
        subtitle="Currently exploring Frontend & Full-Stack roles (React.js, TypeScript). Send job offers or project details."
      />

      <div className="grid md:grid-cols-5 gap-8 relative z-10">
        {/* Left: Info + Opportunity Highlights */}
        <Reveal className="md:col-span-2" x={-30}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 w-fit" style={{ background: 'rgba(0, 212, 170, 0.12)', border: '1px solid rgba(0, 212, 170, 0.3)', color: 'var(--accent)' }}>
            <span className="w-2 h-2 rounded-full status-dot" style={{ background: 'var(--accent)' }} />
            Open for Offers &amp; Roles
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-0)' }}>
            Let's discuss{' '}
            <span className="gradient-text">engineering</span> opportunities.
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-1)', lineHeight: 1.7 }}>
            I specialize in scalable React.js platforms, TypeScript, and micro-frontend architectures with 3.8+ years experience. Whether you have an open engineering role, a high-impact contract, or would like to schedule an introductory call — let's connect.
          </p>

          {/* Quick hiring specs */}
          <div className="surface p-4 rounded-2xl mb-5 space-y-2.5 text-xs font-mono" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between">
              <span style={{ color: 'var(--text-2)' }}>Status</span>
              <span className="font-semibold" style={{ color: 'var(--accent)' }}>Actively Interviewing</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: 'var(--text-2)' }}>Primary Stack</span>
              <span style={{ color: 'var(--text-0)' }}>React 19, TypeScript, Next.js</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: 'var(--text-2)' }}>Workplace</span>
              <span style={{ color: 'var(--text-0)' }}>Remote / Hybrid / Relocation</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: 'var(--text-2)' }}>Response Time</span>
              <span style={{ color: 'var(--text-0)' }}>Within 24 Hours</span>
            </div>
          </div>

          {/* Direct Email card */}
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
                Direct Email
              </div>
              <div className="text-xs font-medium truncate" style={{ color: 'var(--text-0)' }}>
                {personalInfo.email}
              </div>
            </div>
            <Sparkles size={14} className="ml-auto flex-shrink-0" style={{ color: 'var(--accent)' }} />
          </motion.a>

          {/* Location */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl surface mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--blue)', color: 'white' }}
            >
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-2)' }}>
                Current Location
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-0)' }}>
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

        {/* Right: Job Offering & Connect Form */}
        <Reveal className="md:col-span-3" delay={0.15} x={30}>
          <form onSubmit={handleSubmit} className="surface p-6 md:p-7 space-y-4 relative overflow-hidden">
            {/* Gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-3)' }} />

            {/* Opportunity Type Selector Pills */}
            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-1)' }}>
                $ opportunity type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {OPPORTUNITY_TYPES.map((type) => {
                  const isSelected = form.opportunityType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setForm((prev) => ({ ...prev, opportunityType: type }))}
                      className="px-3 py-2 rounded-xl text-xs font-mono text-left transition-all flex items-center justify-between"
                      style={{
                        background: isSelected ? 'rgba(0, 212, 170, 0.12)' : 'var(--bg-2)',
                        border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                        color: isSelected ? 'var(--accent)' : 'var(--text-1)',
                      }}
                    >
                      <span>{type}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name and Email side by side on desktop */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-1)' }}>
                  $ your name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Connor (Recruiter)"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 font-mono"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-1)' }}>
                  $ your work email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="sarah@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 font-mono"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            </div>

            {/* Company / Organization */}
            <div>
              <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-1)' }}>
                $ company / organization
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Stripe, Acme Corp, Stealth Startup"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 font-mono pr-9"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
                <Building2 size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-2)' }} />
              </div>
            </div>

            {/* Message / Job details */}
            <div>
              <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-1)' }}>
                $ role details / job offer / message *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the role, tech stack, remote/on-site requirements, compensation range, or next steps..."
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 font-mono resize-none"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-semibold relative overflow-hidden transition-colors"
              style={{
                background: status === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'var(--accent)',
                color: 'var(--bg-0)',
              }}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1, boxShadow: '0 10px 40px var(--accent-glow)' }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span key="idle" className="flex items-center gap-2 font-medium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Briefcase size={16} />
                    <span>Send Job Opportunity</span>
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
                    <span>Sending Opportunity...</span>
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span key="sent" className="flex items-center gap-2 font-medium" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <CheckCircle2 size={16} />
                    <span>Opportunity Sent! Suryakant will reply soon.</span>
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span key="error" className="flex items-center gap-2 font-medium" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <AlertCircle size={16} />
                    <span>Failed to Send — Click to Retry</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Status feedback banner */}
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
