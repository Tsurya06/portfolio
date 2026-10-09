import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { Github } from './icons/BrandIcons';
import SectionHeading from './SectionHeading';
import { projects } from '@/data/portfolio';

export default function Projects() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section id="projects" className="section-pad max-w-5xl mx-auto">
      <SectionHeading
        number="03"
        title="Featured Project"
        subtitle="A personal engineering platform dedicated to frontend system design, web performance, and modern architecture."
      />

      <div className="max-w-4xl mx-auto">
        <motion.article
          className="surface overflow-hidden group relative"
          whileHover={{ y: -6, borderColor: 'var(--border-bright)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Top accent glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 z-20"
            style={{ background: 'linear-gradient(90deg, var(--accent) 0%, var(--blue) 50%, #a855f7 100%)' }}
          />

          <div className="grid md:grid-cols-12 gap-0 items-center">
            {/* Visual media banner */}
            <div className="md:col-span-5 relative h-72 md:h-full min-h-[300px] overflow-hidden bg-[#0a0d14] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
              {/* Subtle background glow */}
              <div
                className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(0, 212, 170, 0.25) 0%, transparent 70%)' }}
              />

              <motion.img
                src={project.image}
                alt={project.title}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="w-full h-full max-h-[250px] object-contain drop-shadow-2xl relative z-10 rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />

              {/* Featured badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                >
                  <Sparkles size={12} fill="currentColor" />
                  Personal Project
                </span>
              </div>
            </div>

            {/* Content & Details */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-0)' }}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                      whileHover={{ scale: 1.1, color: 'var(--accent)', borderColor: 'var(--accent)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={17} />
                    </motion.a>
                    <motion.a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--accent)', color: 'var(--bg-0)' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={17} />
                    </motion.a>
                  </div>
                </div>

                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-mono mb-4 transition-colors hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  tsurya06.github.io/frontend-forge
                </a>

                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-1)', lineHeight: 1.8 }}>
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl mb-6" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-base sm:text-lg font-bold font-mono" style={{ color: 'var(--accent)' }}>
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-mono" style={{ color: 'var(--text-2)' }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech tags and action button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono"
                      style={{ background: 'var(--bg-3)', color: 'var(--text-1)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold"
                  style={{ color: 'var(--accent)' }}
                  whileHover={{ x: 3 }}
                >
                  Explore Platform
                  <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
