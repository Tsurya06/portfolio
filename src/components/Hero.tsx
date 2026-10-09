import { useEffect, useRef, useState, useCallback, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Linkedin, Sparkles, Mail } from 'lucide-react';
import { Github, Twitter, Dribbble } from './icons/BrandIcons';
import { personalInfo } from '@/data/portfolio';
import Character3D from './Character3D';

const socialIcons: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseY: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    let isVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        baseY: Math.random() * canvas.height,
      }));
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMove, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (isVisible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const draw = () => {
      if (!isVisible || document.hidden) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, 0.4)';
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 170, ${(1 - dist / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

const roles = [
  'Frontend Software Engineer',
  'React & TypeScript Specialist',
  'Micro-Frontends & Real-Time UIs',
  'UI Performance & Core Web Vitals',
];

function useTypewriter(words: string[], typingSpeed = 60, deletingSpeed = 30, pauseMs = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex % words.length] ?? '';

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseMs);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayText;
}

export default function Hero() {
  const typedRole = useTypewriter(roles);

  const scrollToElement = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const scrollToAbout = useCallback(() => {
    scrollToElement('#about');
  }, [scrollToElement]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16 z-10">
      {/* Background layers */}
      <ParticleCanvas />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Floating glow orbs */}
      <motion.div
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-[100px]"
        style={{ background: 'var(--accent-glow)' }}
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-60 h-60 rounded-full blur-[100px]"
        style={{ background: 'var(--blue-glow)' }}
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 w-fit"
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
            >
              <span className="w-2 h-2 rounded-full status-dot" style={{ background: 'var(--accent)' }} />
              {personalInfo.availability}
              <Sparkles size={12} style={{ color: 'var(--accent)' }} />
            </div>

            {/* Name with gradient */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2">
              <span style={{ color: 'var(--text-0)' }}>{personalInfo.firstName}</span>{' '}
              <span className="gradient-text animated-gradient">{personalInfo.lastName}</span>
            </h1>

            {/* Typewriter role - isolated with strict CSS containment to guarantee 0 CLS */}
            <div
              className="mb-4 h-9 sm:h-10 flex items-center overflow-hidden"
              style={{
                contain: 'layout paint size',
                contentVisibility: 'visible',
                height: '40px',
                minHeight: '40px',
                maxHeight: '40px',
                width: '100%',
              }}
            >
              <div
                className="text-lg sm:text-xl md:text-2xl font-mono font-semibold truncate leading-none"
                style={{ color: 'var(--accent)' }}
              >
                <span>{typedRole || '\u00A0'}</span>
                <span className="animate-blink ml-1.5 inline-block" style={{ color: 'var(--accent)' }}>_</span>
              </div>
            </div>

            {/* Tagline */}
            <p
              className="text-base md:text-lg mb-8 max-w-lg"
              style={{ color: 'var(--text-1)', lineHeight: 1.7 }}
            >
              {personalInfo.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={() => scrollToElement('#projects')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{ background: 'var(--accent)', color: 'var(--bg-0)' }}
              >
                View My Work
                <ArrowDown size={15} className="rotate-[-45deg]" />
              </button>
              <button
                onClick={() => scrollToElement('#contact')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-0)' }}
              >
                Let's Talk
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {personalInfo.socials.map((social) => {
                const Icon = socialIcons[social.icon] || Github;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:scale-105 active:scale-95"
                    style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: 3D Character */}
          <div className="hidden md:flex items-center justify-center relative">
            {/* Platform glow */}
            <div
              className="absolute bottom-0 w-40 h-6 rounded-full blur-md"
              style={{ background: 'rgba(0,212,170,0.15)' }}
            />
            <Character3D />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ color: 'var(--text-2)' }}
        aria-label="Scroll down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown size={20} />
        </motion.div>
      </button>
    </section>
  );
}
