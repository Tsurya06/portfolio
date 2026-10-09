import { motion } from 'framer-motion';
import { Code2, Layers, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { StaggerContainer, StaggerItem } from './motion/Reveal';
import { skillsData, techBadges } from '@/data/portfolio';

const categoryIcons: Record<string, typeof Code2> = { Code2, Layers, Wrench };

export default function Skills() {
  return (
    <section id="skills" className="section-pad max-w-5xl mx-auto relative">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-0 w-40 h-40 rounded-full blur-[80px] glow-pulse"
        style={{ background: 'var(--accent-glow)' }}
      />

      <SectionHeading
        number="02"
        title="My Stack"
        subtitle="The tools I use to ship fast, accessible, and beautiful interfaces."
      />

      <StaggerContainer className="grid md:grid-cols-3 gap-5 mb-12">
        {skillsData.map((group) => {
          const Icon = categoryIcons[group.icon] || Code2;
          return (
            <StaggerItem key={group.category}>
              <motion.div
                className="surface p-6 h-full relative overflow-hidden"
                whileHover={{ y: -6, borderColor: group.color + '40' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: group.color, opacity: 0.5 }} />

                <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: group.color + '18', color: group.color }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon size={18} />
                  </motion.div>
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text-0)' }}>
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.items.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium" style={{ color: 'var(--text-0)' }}>
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono" style={{ color: 'var(--text-2)' }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-3)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${group.color}, ${group.color}80)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + si * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Marquee tech badges */}
      <div className="relative overflow-hidden py-4" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex gap-3 marquee whitespace-nowrap">
          {[...techBadges, ...techBadges].map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-sm font-mono flex-shrink-0"
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
