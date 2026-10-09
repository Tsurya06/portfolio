import { motion } from 'framer-motion';
import { Zap, Layers, Blocks, Gauge, MapPin, Mail, Coffee } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Reveal, StaggerContainer, StaggerItem, Counter } from './motion/Reveal';
import { aboutContent, personalInfo, stats } from '@/data/portfolio';

const philosophyIcons: Record<string, typeof Zap> = { Zap, Layers, Blocks, Gauge };

export default function About() {
  return (
    <section id="about" className="section-pad max-w-5xl mx-auto">
      <SectionHeading number="01" title="About Me" subtitle={aboutContent.intro} />

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Bio */}
        <Reveal className="lg:col-span-2" y={30}>
          <div className="space-y-4 mb-8">
            {aboutContent.paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--text-1)', lineHeight: 1.8 }}>
                {para}
              </p>
            ))}
          </div>

          {/* Philosophy cards */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-3">
            {aboutContent.philosophy.map((item) => {
              const Icon = philosophyIcons[item.icon] || Zap;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    className="surface p-5 h-full"
                    whileHover={{ y: -6, borderColor: 'var(--border-bright)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: 'var(--bg-3)', color: 'var(--accent)' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-0)' }}>
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-1)' }}>
                      {item.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Reveal>

        {/* Side card */}
        <Reveal delay={0.15} x={30}>
          <div className="surface p-6 sticky top-24 overflow-hidden relative">
            {/* Gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-1)' }} />

            {/* Avatar */}
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold font-mono"
                style={{ background: 'var(--gradient-1)', color: 'var(--bg-0)' }}
                whileHover={{ scale: 1.05 }}
              >
                {personalInfo.firstName[0]}{personalInfo.lastName[0]}
              </motion.div>
              <div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-0)' }}>
                  {personalInfo.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--accent)' }}>
                  {personalInfo.role}
                </p>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs p-2.5 rounded-lg" style={{ background: 'var(--bg-2)' }}>
                <MapPin size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-1)' }}>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs p-2.5 rounded-lg" style={{ background: 'var(--bg-2)' }}>
                <Mail size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-1)' }}>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs p-2.5 rounded-lg" style={{ background: 'var(--bg-2)' }}>
                <Coffee size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-1)' }}>{personalInfo.availability}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Stats row */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <motion.div
              className="surface p-5 text-center relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl md:text-4xl font-bold font-mono mb-1" style={{ color: 'var(--accent)' }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs" style={{ color: 'var(--text-1)' }}>
                {stat.label}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
