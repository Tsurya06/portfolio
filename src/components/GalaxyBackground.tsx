import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

interface Nebula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const STAR_COLORS = [
  'rgba(255, 255, 255,',
  'rgba(180, 200, 255,',
  'rgba(200, 220, 255,',
  'rgba(255, 240, 220,',
  'rgba(0, 212, 170,',
  'rgba(100, 180, 255,',
];

const NEBULA_COLORS = [
  { r: 0, g: 100, b: 180 },
  { r: 120, g: 40, b: 160 },
  { r: 0, g: 120, b: 100 },
];

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let nebulas: Nebula[] = [];
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 2500), 400);
      stars = Array.from({ length: starCount }, () => {
        const z = Math.random();
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z,
          size: z * 2 + 0.3,
          baseAlpha: 0.3 + z * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        };
      });

      const nebCount = 3;
      nebulas = Array.from({ length: nebCount }, (_, i) => {
        const c = NEBULA_COLORS[i % NEBULA_COLORS.length];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: 200 + Math.random() * 300,
          color: `rgba(${c.r}, ${c.g}, ${c.b},`,
        };
      });
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!prefersReducedMotion) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const spawnShootingStar = () => {
      if (shootingStars.length >= 2) return;
      const fromLeft = Math.random() > 0.5;
      const startY = Math.random() * canvas.height * 0.6;
      const speed = 8 + Math.random() * 6;
      const angle = fromLeft
        ? Math.PI * 0.15 + Math.random() * 0.15
        : Math.PI * 0.65 + Math.random() * 0.15;
      shootingStars.push({
        x: fromLeft ? -50 : canvas.width + 50,
        y: startY,
        vx: fromLeft ? Math.cos(angle) * speed : -Math.cos(Math.PI - angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        trail: [],
      });
    };

    let shootingTimer = 0;

    const draw = () => {
      time += 0.016;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.fillStyle = '#06060a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebulas
      nebulas.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -n.size) n.x = canvas.width + n.size;
        if (n.x > canvas.width + n.size) n.x = -n.size;
        if (n.y < -n.size) n.y = canvas.height + n.size;
        if (n.y > canvas.height + n.size) n.y = -n.size;

        const parallaxX = n.x + mouseX * 20;
        const parallaxY = n.y + mouseY * 20;

        const grad = ctx.createRadialGradient(parallaxX, parallaxY, 0, parallaxX, parallaxY, n.size);
        grad.addColorStop(0, n.color + ' 0.08)');
        grad.addColorStop(0.5, n.color + ' 0.03)');
        grad.addColorStop(1, n.color + ' 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, n.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars with parallax + twinkle
      stars.forEach((s) => {
        const parallax = s.z * 30;
        const px = s.x + mouseX * parallax;
        const py = s.y + mouseY * parallax;

        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.baseAlpha * (0.5 + twinkle * 0.5);

        // Glow for brighter stars
        if (s.z > 0.7) {
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, s.size * 4);
          glowGrad.addColorStop(0, s.color + ` ${alpha * 0.3})`);
          glowGrad.addColorStop(1, s.color + ' 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(px, py, s.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + ` ${alpha})`;
        ctx.fill();
      });

      // Shooting stars
      shootingTimer++;
      if (shootingTimer > 200 && Math.random() < 0.02) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      shootingStars = shootingStars.filter((ss) => {
        ss.life++;
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.trail.push({ x: ss.x, y: ss.y });
        if (ss.trail.length > 20) ss.trail.shift();

        const lifeRatio = ss.life / ss.maxLife;
        const alpha = lifeRatio < 0.2 ? lifeRatio * 5 : 1 - (lifeRatio - 0.2) / 0.8;

        // Draw trail
        for (let i = 0; i < ss.trail.length; i++) {
          const t = i / ss.trail.length;
          ctx.beginPath();
          ctx.arc(ss.trail[i].x, ss.trail[i].y, t * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${t * alpha * 0.6})`;
          ctx.fill();
        }

        // Head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        const headGrad = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 8);
        headGrad.addColorStop(0, `rgba(180, 200, 255, ${alpha * 0.5})`);
        headGrad.addColorStop(1, 'rgba(180, 200, 255, 0)');
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 8, 0, Math.PI * 2);
        ctx.fill();

        return ss.life < ss.maxLife && ss.x > -100 && ss.x < canvas.width + 100;
      });

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
