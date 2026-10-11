import { lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GalaxyBackground from '@/components/GalaxyBackground';

// Lazy-load below-the-fold sections & companion for blazing fast initial FCP/LCP
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Experience = lazy(() => import('@/components/Experience'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const CubeeCompanion = lazy(() => import('@/components/CubeeCompanion'));

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-0)' }}>

      {/* Galaxy starfield background */}
      <GalaxyBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, var(--accent), var(--blue))' }}
      />

      <Navbar />

      <main className="relative" style={{ zIndex: 10 }}>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <CubeeCompanion />
      </Suspense>

    </div>
  );
}

export default App;
