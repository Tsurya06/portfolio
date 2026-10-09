import { useEffect, useRef, useState } from 'react';

export default function Character3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftGlintRef = useRef<HTMLSpanElement>(null);
  const rightGlintRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    let rafId: number | null = null;
    let latestEvent: MouseEvent | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const updateTransforms = () => {
      rafId = null;
      if (!isVisible || !latestEvent || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from mascot center
      const dx = latestEvent.clientX - centerX;
      const dy = latestEvent.clientY - centerY;

      // High-sensitivity normalized tracking (full range reached within 450px of mascot)
      const radius = 450;
      const normX = Math.max(-1, Math.min(1, dx / radius));
      const normY = Math.max(-1, Math.min(1, dy / radius));

      const rotY = normX * 15;
      const rotX = -normY * 11;

      if (cardRef.current) {
        cardRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translateX(${rotY * 1.5}px) scale(${1 + Math.abs(rotX) * 0.02})`;
      }

      // Noticeable 3D eye tracking translation (up to 8.5px X, 7px Y)
      const lookX = normX * 8.5;
      const lookY = normY * 7.0;

      // 3D Spherical foreshortening and rotation
      const irisRotY = lookX * 3.5;
      const irisRotX = -lookY * 3.5;

      const irisTransform = `translate3d(${lookX}px, ${lookY}px, 0px) rotateY(${irisRotY}deg) rotateX(${irisRotX}deg) scale(${1 - Math.abs(normX) * 0.04})`;
      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = irisTransform;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = irisTransform;
      }

      // Parallax cornea highlight shift
      const glintX = -lookX * 0.35;
      const glintY = -lookY * 0.35;
      const glintTransform = `translate(${glintX}px, ${glintY}px)`;
      if (leftGlintRef.current) {
        leftGlintRef.current.style.transform = glintTransform;
      }
      if (rightGlintRef.current) {
        rightGlintRef.current.style.transform = glintTransform;
      }
    };

    const handleMouse = (event: MouseEvent) => {
      if (!isVisible) return;
      latestEvent = event;
      rafId ??= requestAnimationFrame(updateTransforms);
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[270px] h-[320px] flex items-center justify-center select-none"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Platform glow beneath */}
      <div
        ref={glowRef}
        className="absolute bottom-1 w-52 h-7 rounded-full blur-xl opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 170, 0.45) 0%, rgba(0, 212, 170, 0) 70%)',
          transition: 'transform 0.12s ease-out',
        }}
      />

      <div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
          animation: mounted ? 'charFloat 4s ease-in-out infinite' : 'none',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Left eye socket (behind face) */}
        <div
          className="absolute z-10 overflow-hidden flex items-center justify-center pointer-events-none"
          style={{
            left: '31.8%',
            top: '54.5%',
            width: '36px',
            height: '42px',
            transform: 'translate(-50%, -50%) translateZ(-6px)',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f0f5fa 55%, #c8d7e6 100%)',
            borderRadius: '46% 46% 42% 42%',
            boxShadow: 'inset 0 6px 10px rgba(8, 20, 36, 0.38), inset 0 -4px 8px rgba(8, 20, 36, 0.22), inset 4px 0 6px rgba(8, 20, 36, 0.18), inset -4px 0 6px rgba(8, 20, 36, 0.18)',
          }}
          aria-hidden="true"
        >
          {/* Left 3D Iris & Cornea */}
          <div
            ref={leftPupilRef}
            className="relative rounded-full transition-transform duration-75 ease-out"
            style={{
              width: '21px',
              height: '27px',
              background: 'radial-gradient(circle at 45% 35%, #8de9ff 0%, #20b0eb 35%, #1268aa 65%, #0e2746 90%, #061324 100%)',
              border: '1.5px solid #081729',
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.75), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 3px 8px rgba(0, 0, 0, 0.45)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Deep center pupil */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: '8px',
                height: '11px',
                background: 'radial-gradient(circle at 45% 45%, #182638 0%, #060b14 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
              }}
            />
            {/* Primary 3D Cornea glass shine with parallax shift */}
            <span
              ref={leftGlintRef}
              className="absolute rounded-full bg-white transition-transform duration-75 ease-out pointer-events-none"
              style={{
                left: '3px',
                top: '3px',
                width: '6px',
                height: '7px',
                boxShadow: '0 0 3px rgba(255, 255, 255, 0.9), 0 0 6px rgba(110, 228, 255, 0.6)',
              }}
            />
            {/* Secondary lower pupil reflection */}
            <span
              className="absolute rounded-full bg-cyan-200/80 pointer-events-none"
              style={{
                right: '3px',
                bottom: '3px',
                width: '4px',
                height: '4px',
                filter: 'blur(0.3px)',
              }}
            />
          </div>
        </div>

        {/* Right eye socket (behind face) */}
        <div
          className="absolute z-10 overflow-hidden flex items-center justify-center pointer-events-none"
          style={{
            left: '61.9%',
            top: '53.9%',
            width: '38px',
            height: '42px',
            transform: 'translate(-50%, -50%) translateZ(-6px)',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f0f5fa 55%, #c8d7e6 100%)',
            borderRadius: '46% 46% 42% 42%',
            boxShadow: 'inset 0 6px 10px rgba(8, 20, 36, 0.38), inset 0 -4px 8px rgba(8, 20, 36, 0.22), inset 4px 0 6px rgba(8, 20, 36, 0.18), inset -4px 0 6px rgba(8, 20, 36, 0.18)',
          }}
          aria-hidden="true"
        >
          {/* Right 3D Iris & Cornea */}
          <div
            ref={rightPupilRef}
            className="relative rounded-full transition-transform duration-75 ease-out"
            style={{
              width: '22px',
              height: '27px',
              background: 'radial-gradient(circle at 45% 35%, #8de9ff 0%, #20b0eb 35%, #1268aa 65%, #0e2746 90%, #061324 100%)',
              border: '1.5px solid #081729',
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.75), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 3px 8px rgba(0, 0, 0, 0.45)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Deep center pupil */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: '8px',
                height: '11px',
                background: 'radial-gradient(circle at 45% 45%, #182638 0%, #060b14 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
              }}
            />
            {/* Primary 3D Cornea glass shine with parallax shift */}
            <span
              ref={rightGlintRef}
              className="absolute rounded-full bg-white transition-transform duration-75 ease-out pointer-events-none"
              style={{
                left: '3px',
                top: '3px',
                width: '6px',
                height: '7px',
                boxShadow: '0 0 3px rgba(255, 255, 255, 0.9), 0 0 6px rgba(110, 228, 255, 0.6)',
              }}
            />
            {/* Secondary lower pupil reflection */}
            <span
              className="absolute rounded-full bg-cyan-200/80 pointer-events-none"
              style={{
                right: '3px',
                bottom: '3px',
                width: '4px',
                height: '4px',
                filter: 'blur(0.3px)',
              }}
            />
          </div>
        </div>

        {/* 3D Foreground cutout face */}
        <img
          src="/naruto-face-cutout.png"
          alt="Cheerful chibi ninja character"
          width={270}
          height={320}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-20 h-full w-full object-contain drop-shadow-xl pointer-events-none"
          style={{
            transform: 'translateZ(10px)',
          }}
        />
      </div>
    </div>
  );
}
