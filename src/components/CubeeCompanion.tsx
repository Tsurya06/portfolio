import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '@bible-strong/avatar-react';
import type { AnimationKey, ExpressionKey } from '@bible-strong/avatar-core';
import { cubeeAvatarDefinition } from '@/data/cubeeAvatar';
import { personalInfo } from '@/data/portfolio';
import { Sparkles, Eye, EyeOff, X, ArrowDown, Send } from 'lucide-react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
}

const SURYA_TIPS = [
  "Surya is currently available for Frontend & Full-Stack roles! ✨",
  "Specializes in React.js, TypeScript, and Micro-Frontends! ⚡",
  "100% Core Web Vitals score — fast, smooth, and resilient 🚀",
  "3.8+ years engineering large-scale enterprise & real-time platforms! 💡",
  "Check out Surya's GitHub (@Tsurya06) for code and repos! 🐙",
  "Connect with Surya on LinkedIn for great opportunities! 💼",
];

const SECTION_COMMENTS: Record<string, { text: string; mood: 'happy' | 'think' | 'excited' | 'curious' }> = {
  hero: {
    text: "Hey there! 👋 Welcome to Surya's portfolio!",
    mood: 'happy',
  },
  about: {
    text: "Surya has 3.8+ years building enterprise React & TypeScript platforms! 💡",
    mood: 'think',
  },
  skills: {
    text: "Explore Surya's tech stack: React, Micro-Frontends & Web Vitals! 🛠️",
    mood: 'excited',
  },
  projects: {
    text: "Check out Surya's featured production frontend architecture! 🚀",
    mood: 'excited',
  },
  experience: {
    text: "Surya's engineering career delivering real-world scale & impact! 📈",
    mood: 'think',
  },
  contact: {
    text: "Ready to build something exceptional? Drop Surya a note! 💬",
    mood: 'happy',
  },
};

// Desktop contextual hover knowledge base
function getContextComment(target: Element): { text: string; mood: 'happy' | 'think' | 'excited' | 'curious' } | null {
  // Naruto 3D mascot
  if (target.closest('img[src*="naruto"]') || target.closest('[class*="Character3D"]') || target.closest('#hero .md\\:flex')) {
    return {
      text: "That's Naruto! 🍥 Surya's 3D ninja buddy! Dattebayo!",
      mood: 'happy',
    };
  }

  // Socials
  if (target.closest('a[href*="github.com"]')) {
    return {
      text: "Explore Surya's open-source projects & code on GitHub! 🐙",
      mood: 'excited',
    };
  }
  if (target.closest('a[href*="linkedin.com"]')) {
    return {
      text: "Connect with Surya on LinkedIn for engineering opportunities! 💼",
      mood: 'happy',
    };
  }
  if (target.closest('a[href*="twitter.com"]') || target.closest('a[href*="x.com"]')) {
    return {
      text: "Follow Surya on X/Twitter for web performance & tech insights! 🐦",
      mood: 'curious',
    };
  }
  if (target.closest('a[href^="mailto:"]') || target.closest('a[href*="mail"]')) {
    return {
      text: `Send a direct email to ${personalInfo.email}! 📬`,
      mood: 'happy',
    };
  }

  // Navigation Links
  const navLink = target.closest('nav a, header a');
  if (navLink) {
    const text = navLink.textContent?.trim().toLowerCase() || '';
    if (text.includes('about')) return { text: "Jump to About: Surya's background and philosophy 📖", mood: 'curious' };
    if (text.includes('skills')) return { text: "Jump to Skills: Surya's core technical stack 🛠️", mood: 'think' };
    if (text.includes('experience')) return { text: "Jump to Experience: Career milestones & impact 🏢", mood: 'excited' };
    if (text.includes('projects')) return { text: "Jump to Projects: Production-grade web apps 🚀", mood: 'excited' };
    if (text.includes('contact')) return { text: "Jump to Contact: Drop Surya a quick message 💬", mood: 'happy' };
  }

  // Hero section elements
  if (target.closest('#hero button:has(svg.rotate-\\[-45deg\\])') || target.closest('button[onClick*="projects"]')) {
    return {
      text: "Click to explore Surya's featured case studies! 💼",
      mood: 'excited',
    };
  }
  if (target.closest('#hero button') && target.textContent?.toLowerCase().includes("let's talk")) {
    return {
      text: "Ready to collaborate? Let's connect and build! ✉️",
      mood: 'happy',
    };
  }
  if (target.closest('.status-dot') || (target.closest('#hero') && target.textContent?.toLowerCase().includes('available'))) {
    return {
      text: "Surya is currently available for Frontend & Full-Stack roles! ✨",
      mood: 'happy',
    };
  }

  // Skills section elements
  const skillItem = target.closest('#skills span, #skills h3, #skills .surface');
  if (skillItem) {
    const text = (target.textContent || '').toLowerCase();
    if (text.includes('react')) return { text: "React.js — Modular, high-performance component architecture! ⚛️", mood: 'excited' };
    if (text.includes('typescript')) return { text: "TypeScript — Strict typing and rock-solid code reliability! 🛡️", mood: 'think' };
    if (text.includes('next')) return { text: "Next.js — SSR, SSG, Server Components, and SEO excellence! ⚡", mood: 'excited' };
    if (text.includes('micro') || text.includes('federation')) return { text: "Micro-Frontends — Decoupled large-scale architectures! 🧩", mood: 'think' };
    if (text.includes('performance') || text.includes('vitals')) return { text: "Core Web Vitals — Optimized for blazing 100/100 performance! 💯", mood: 'excited' };
    if (text.includes('tailwind') || text.includes('css')) return { text: "Tailwind & Vanilla CSS — Pixel-perfect responsive styling! 🎨", mood: 'happy' };
    if (text.includes('webpack') || text.includes('vite')) return { text: "Vite & Webpack — Ultra-fast builds & bundle optimizations! ⚡", mood: 'think' };
    if (text.includes('redux') || text.includes('zustand')) return { text: "State Management — Predictable and reactive UI pipelines! 📦", mood: 'think' };
    return { text: "Surya's technical skill set for modern frontend engineering! 🛠️", mood: 'curious' };
  }

  // Projects section
  if (target.closest('#projects')) {
    if (target.closest('a[aria-label="Live Demo"]')) {
      return { text: "Click to test the live production deployment! 🌐", mood: 'excited' };
    }
    if (target.closest('a[aria-label="GitHub Repository"]')) {
      return { text: "Inspect the repository source code on GitHub! 🐙", mood: 'curious' };
    }
    return {
      text: "Featured Project: Enterprise frontend platform with real-time UI! 🚀",
      mood: 'excited',
    };
  }

  // Experience section
  if (target.closest('#experience')) {
    return {
      text: "Professional history: Frontend Software Engineer shipping real impact! 📈",
      mood: 'think',
    };
  }

  // About section
  if (target.closest('#about')) {
    return {
      text: "About Surya — Passionate about web performance, architecture & DX! 💡",
      mood: 'happy',
    };
  }

  // Contact section
  if (target.closest('#contact')) {
    if (target.closest('input, textarea')) {
      return { text: "Drop Surya a note! Messages go straight to his inbox 📨", mood: 'happy' };
    }
    if (target.closest('button[type="submit"]')) {
      return { text: "Send message! Surya replies promptly 🚀", mood: 'excited' };
    }
  }

  return null;
}

const CUBEE_STORAGE_KEY = 'cubee_companion_enabled';

export default function CubeeCompanion() {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const saved = localStorage.getItem(CUBEE_STORAGE_KEY);
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const setEnabled = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setEnabledState((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      try {
        localStorage.setItem(CUBEE_STORAGE_KEY, String(next));
      } catch {
        // storage disabled or unavailable
      }
      return next;
    });
  }, []);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState<{ vx: number; vy: number; speed: number }>({ vx: 0, vy: 0, speed: 0 });
  const [comment, setComment] = useState<string | null>(null);
  const [mood, setMood] = useState<'happy' | 'think' | 'excited' | 'curious' | 'idle'>('idle');
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [mobileTipIndex, setMobileTipIndex] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Position references for smooth spring chasing
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const isTabActiveRef = useRef(typeof document !== 'undefined' ? !document.hidden : true);
  const hasPointerMovedInTabRef = useRef(false);
  const commentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  // Detect touch / mobile screen
  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.innerWidth < 768;
      setIsTouchDevice(isCoarse || isSmall);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Mobile scroll-spy: tour guide mode as user scrolls down sections
  useEffect(() => {
    if (!enabled || !isTouchDevice) return;

    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const sectionId = visible.target.id;
          const sectionData = SECTION_COMMENTS[sectionId];
          if (sectionData) {
            setComment(sectionData.text);
            setMood(sectionData.mood);
            setIsMobileOpen(true);

            if (commentTimerRef.current) clearTimeout(commentTimerRef.current);
            commentTimerRef.current = setTimeout(() => {
              setIsMobileOpen(false);
            }, 4500);
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (commentTimerRef.current) clearTimeout(commentTimerRef.current);
    };
  }, [enabled, isTouchDevice]);

  // Desktop mouse chase listener & element inspector with tab-switch pause
  useEffect(() => {
    if (!enabled || isTouchDevice) return;

    const stopTracking = () => {
      isTabActiveRef.current = false;
      hasPointerMovedInTabRef.current = false;
      setVelocity({ vx: 0, vy: 0, speed: 0 });
      setMood('idle');
      if (commentTimerRef.current) clearTimeout(commentTimerRef.current);
    };

    const resumeTracking = () => {
      if (document.visibilityState === 'visible') {
        isTabActiveRef.current = true;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTracking();
      } else {
        resumeTracking();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.hidden || !isTabActiveRef.current) return;

      hasPointerMovedInTabRef.current = true;
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check context under cursor
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      if (elem) {
        const info = getContextComment(elem);
        if (info) {
          setComment(info.text);
          setMood(info.mood);
          if (commentTimerRef.current) clearTimeout(commentTimerRef.current);
          commentTimerRef.current = setTimeout(() => {
            setComment(null);
          }, 4500);
        }
      }
    };

    const handleMouseLeave = () => {
      hasPointerMovedInTabRef.current = false;
      setVelocity({ vx: 0, vy: 0, speed: 0 });
      setMood('idle');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('blur', stopTracking);
    window.addEventListener('focus', resumeTracking);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('blur', stopTracking);
      window.removeEventListener('focus', resumeTracking);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (commentTimerRef.current) clearTimeout(commentTimerRef.current);
    };
  }, [enabled, isTouchDevice]);

  // Desktop physics loop: runs smoothly behind cursor when active
  useEffect(() => {
    if (!enabled || isTouchDevice) return;

    let particleId = 0;

    const tick = () => {
      // Pause chasing when tab is inactive, hidden, or cursor has not entered tab yet
      if (document.hidden || !isTabActiveRef.current || !hasPointerMovedInTabRef.current) {
        setVelocity((prev) => (prev.speed === 0 ? prev : { vx: 0, vy: 0, speed: 0 }));
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const targetX = targetRef.current.x + 32;
      const targetY = targetRef.current.y + 32;

      const clampedTargetX = Math.min(window.innerWidth - 80, Math.max(20, targetX));
      const clampedTargetY = Math.min(window.innerHeight - 80, Math.max(20, targetY));

      const currentX = posRef.current.x;
      const currentY = posRef.current.y;

      if (currentX < 0) {
        posRef.current = { x: clampedTargetX, y: clampedTargetY };
      } else {
        const dx = clampedTargetX - currentX;
        const dy = clampedTargetY - currentY;

        const chaseSpeed = 0.14;
        const newX = currentX + dx * chaseSpeed;
        const newY = currentY + dy * chaseSpeed;

        posRef.current = { x: newX, y: newY };

        const vx = dx * chaseSpeed;
        const vy = dy * chaseSpeed;
        const speed = Math.sqrt(vx * vx + vy * vy);

        setVelocity({ vx, vy, speed });
        setCoords({ x: newX, y: newY });

        if (speed > 5 && Math.random() < 0.25) {
          particleId++;
          setParticles((prev) => [
            ...prev.slice(-6),
            { id: particleId, x: newX + 24, y: newY + 44, scale: Math.random() * 0.4 + 0.4 },
          ]);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, isTouchDevice]);

  // Clean old trail particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  // Mobile tap handler: cycle tips on tap
  const handleMobileTap = useCallback(() => {
    const nextIdx = (mobileTipIndex + 1) % SURYA_TIPS.length;
    setMobileTipIndex(nextIdx);
    setComment(SURYA_TIPS[nextIdx]);
    setMood('excited');
    setIsMobileOpen(true);

    if (commentTimerRef.current) clearTimeout(commentTimerRef.current);
    commentTimerRef.current = setTimeout(() => {
      setIsMobileOpen(false);
    }, 5500);
  }, [mobileTipIndex]);

  // Smooth scroll to contact
  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  }, []);

  // Determine Cubee's active expression or animation
  const avatarConfig = useMemo<{ expression?: ExpressionKey; animation?: AnimationKey }>(() => {
    if (mood === 'excited') return { animation: 'excited' };
    if (mood === 'think') return { animation: 'thinking' };
    if (mood === 'happy') return { animation: 'happy' };
    if (mood === 'curious') return { expression: 'curious-left' };

    // When running on desktop
    if (!isTouchDevice && velocity.speed > 3) {
      if (velocity.vx < -1.5) return { expression: 'attentive-left' };
      if (velocity.vx > 1.5) return { expression: 'playful-right' };
      if (velocity.vy < -1.5) return { expression: 'upward-side-glance' };
      return { expression: 'downward-gaze' };
    }

    return { expression: 'neutral' };
  }, [mood, isTouchDevice, velocity]);

  const leanAngle = Math.max(-18, Math.min(18, velocity.vx * 1.8));

  if (!enabled) {
    return (
      <button
        onClick={() => setEnabled(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-md transition-all hover:scale-105"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          boxShadow: '0 4px 20px rgba(0, 212, 170, 0.2)',
        }}
        title="Wake Cubee"
      >
        <Eye size={13} />
        <span>Wake Cubee 🤖</span>
      </button>
    );
  }

  // =========================================================================
  // MOBILE / TOUCHSCREEN UX: Corner Tour Guide Widget
  // =========================================================================
  if (isTouchDevice) {
    return (
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
        {/* Dynamic Mobile Speech Bubble */}
        <AnimatePresence>
          {isMobileOpen && comment && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 max-w-[270px] p-3.5 rounded-2xl text-xs font-medium shadow-2xl relative"
              style={{
                background: 'rgba(16, 22, 34, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(230, 92, 92, 0.45)',
                color: 'var(--text-0)',
                boxShadow: '0 12px 30px -8px rgba(230, 92, 92, 0.35)',
              }}
            >
              {/* Close bubble button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileOpen(false);
                }}
                className="absolute top-2 right-2 p-1 text-white/50 hover:text-white"
                aria-label="Close message"
              >
                <X size={12} />
              </button>

              <div className="flex items-start gap-2 pr-4 leading-relaxed">
                <Sparkles size={14} className="text-[#e65c5c] shrink-0 mt-0.5" />
                <span>{comment}</span>
              </div>

              {/* Quick Contact CTA pill */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handleMobileTap}
                  className="text-[11px] font-mono text-white/60 hover:text-white flex items-center gap-1"
                >
                  <span>Next tip</span>
                  <ArrowDown size={11} className="-rotate-90" />
                </button>
                <button
                  onClick={scrollToContact}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 text-[#0b0f17]"
                  style={{ background: 'var(--accent)' }}
                >
                  <Send size={10} />
                  <span>Talk to Surya</span>
                </button>
              </div>

              {/* Speech bubble pointer notch */}
              <div
                className="absolute -bottom-2 right-7 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]"
                style={{ borderTopColor: 'rgba(16, 22, 34, 0.95)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Interactive Cubee Mascot Button */}
        <div className="flex items-center gap-2">
          {/* Sleep / Hide toggle button */}
          <button
            onClick={() => setEnabled(false)}
            className="p-1.5 rounded-full backdrop-blur-md opacity-60 hover:opacity-100 transition-opacity"
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid var(--border)',
              color: 'var(--text-1)',
            }}
            title="Dismiss Cubee"
            aria-label="Dismiss Cubee"
          >
            <EyeOff size={12} />
          </button>

          {/* Cubee Button with Floating Aura */}
          <motion.button
            onClick={handleMobileTap}
            whileTap={{ scale: 0.92 }}
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl focus:outline-none"
            style={{
              background: 'rgba(16, 22, 34, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(230, 92, 92, 0.5)',
              boxShadow: '0 8px 25px -6px rgba(230, 92, 92, 0.4)',
            }}
            aria-label="Tap to ask Cubee about Surya"
          >
            {/* Pulsing notification indicator */}
            {!isMobileOpen && (
              <span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                style={{ background: '#e65c5c' }}
              />
            )}
            {!isMobileOpen && (
              <span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ background: '#e65c5c' }}
              />
            )}

            {/* Compact Procedural Avatar */}
            <div className="w-11 h-11 pointer-events-none">
              <Avatar
                definition={cubeeAvatarDefinition}
                expression={avatarConfig.expression}
                animation={avatarConfig.animation}
                size="100%"
              />
            </div>
          </motion.button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESKTOP UX: Smooth Pointer-Trailing Runner
  // =========================================================================
  if (coords.x < -50) {
    return null;
  }

  return (
    <>
      {/* Bottom-left quiet toggle */}
      <button
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono backdrop-blur-md opacity-70 hover:opacity-100 transition-opacity"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--border)',
          color: 'var(--text-1)',
        }}
        title="Click to toggle Cubee follower on or off"
      >
        <EyeOff size={11} />
        <span>Cubee Active</span>
      </button>

      {/* Trailing sprint sparkles */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: p.scale }}
            animate={{ opacity: 0, scale: 0.1, y: p.y + 12 }}
            transition={{ duration: 0.4 }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: p.x,
              top: p.y,
              background: 'radial-gradient(circle, #e65c5c 0%, transparent 70%)',
            }}
          />
        ))}
      </div>

      {/* Floating Pointer Companion */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: coords.x,
          top: coords.y,
          transform: `translate3d(0, 0, 0) rotate(${leanAngle}deg)`,
          transition: 'transform 0.08s ease-out',
          willChange: 'transform, left, top',
        }}
      >
        {/* Context-aware Speech Bubble */}
        <AnimatePresence>
          {comment && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 max-w-[240px] w-max px-3.5 py-2 rounded-2xl text-xs font-medium text-center shadow-2xl pointer-events-none"
              style={{
                background: 'rgba(16, 22, 34, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(230, 92, 92, 0.45)',
                color: 'var(--text-0)',
                boxShadow: '0 10px 30px -8px rgba(230, 92, 92, 0.4)',
              }}
            >
              <div className="flex items-center gap-1.5 justify-center leading-snug">
                <Sparkles size={12} className="text-[#e65c5c] shrink-0" />
                <span>{comment}</span>
              </div>
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px]"
                style={{ borderTopColor: 'rgba(16, 22, 34, 0.95)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cubee Runner Avatar */}
        <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] flex items-center justify-center">
          <div
            className="absolute -bottom-1 w-10 h-2 rounded-full blur-[3px]"
            style={{
              background: 'rgba(230, 92, 92, 0.35)',
              transform: `scale(${1 + velocity.speed * 0.05})`,
            }}
          />

          <Avatar
            definition={cubeeAvatarDefinition}
            expression={avatarConfig.expression}
            animation={avatarConfig.animation}
            size="100%"
          />
        </div>
      </div>
    </>
  );
}
