import { motion } from 'framer-motion';

interface SectionHeadingProps {
  readonly number: string;
  readonly title: string;
  readonly subtitle?: string;
}

export default function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>
          {number}
        </span>
        <span className="font-mono text-sm" style={{ color: 'var(--text-2)' }}>—</span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-0)' }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text-1)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
