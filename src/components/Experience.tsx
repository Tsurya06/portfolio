import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Reveal } from './motion/Reveal';
import { experience } from '@/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section-pad max-w-5xl mx-auto">
      <SectionHeading
        number="04"
        title="Experience"
        subtitle="My professional journey building production software."
      />

      <div className="max-w-3xl relative">
        {/* Vertical line */}
        <div
          className="absolute left-[19px] top-2 bottom-2 w-px"
          style={{ background: 'var(--border)' }}
        />

        {experience.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.1} y={30} className={index < experience.length - 1 ? 'mb-8' : ''}>
            <div className="relative pl-12">
              {/* Timeline dot with pulse */}
              <motion.div
                className="absolute left-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-2)', border: '1.5px solid var(--accent)' }}
                whileHover={{ scale: 1.15, boxShadow: '0 0 20px var(--accent-glow)' }}
              >
                <Briefcase size={16} style={{ color: 'var(--accent)' }} />
                {/* Pulse ring */}
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  style={{ border: '1.5px solid var(--accent)' }}
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>

              {/* Card */}
              <motion.div
                className="surface p-5"
                whileHover={{ borderColor: 'var(--border-bright)', x: 4 }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-0)' }}>
                    {item.role}
                  </h3>
                  <span
                    className="font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--bg-3)', color: 'var(--accent)' }}
                  >
                    {item.period}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-semibold" style={{ color: 'var(--blue)' }}>
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-2)' }}>
                    <MapPin size={11} />
                    {item.location}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-1)', lineHeight: 1.7 }}>
                  {item.description}
                </p>

                {/* Achievements */}
                <ul className="space-y-1.5 mb-4">
                  {item.achievements.map((achievement, ai) => (
                    <li key={ai} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-1)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                      {achievement}
                    </li>
                  ))}
                </ul>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{ background: 'var(--bg-3)', color: 'var(--text-2)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
