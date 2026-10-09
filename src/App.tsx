import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GalaxyBackground from '@/components/GalaxyBackground';
import CubeeCompanion from '@/components/CubeeCompanion';

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
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <CubeeCompanion />

    </div>
  );
}

export default App;
