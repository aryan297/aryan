import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const ease = [0.22, 1, 0.36, 1];

const experiences = [
  {
    role: 'Senior Software Engineer 3 (SDE-3)',
    company: 'Vola Finance',
    location: 'Bengaluru, India',
    period: '04/2025 - Present',
    type: 'Full-time',
    badge: 'Current',
    project: 'Gentoo App - Microfinance Platform (Spain)',
    tech: ['NestJS', 'Node.js', 'Go (Gin)', 'ConnectPay', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
    highlights: [
      'Architected a modular microfinance platform using NestJS and Node.js serving 10,000+ daily active users.',
      'Integrated ConnectPay and Bank of Lithuania APIs for full BaaS capabilities, reducing onboarding time by 60%.',
      'Designed event-driven architecture with Redis pub/sub achieving 99.9% payment flow reliability.',
      'Developed a high-concurrency Go (Gin) scheduler handling 500+ daily reconciliation jobs with zero data loss.',
    ],
  },
  {
    role: 'Senior Software Engineer (SDE-2)',
    company: 'BluSmart Mobility',
    location: 'Gurgaon, India',
    period: '12/2022 - 04/2025',
    type: 'Full-time',
    badge: '2.4 yrs',
    tech: ['Go (Gin)', 'Node.js', 'Angular 17', 'Redis', 'PostgreSQL', 'Kubernetes', 'AWS', 'Kafka', 'Docker'],
    highlights: [
      'Built a scalable Transport Management System in Go serving 8,000+ drivers with dynamic form rendering.',
      'Engineered an operations web app for 50+ hubs; OnPush change detection reduced page load time by 35%.',
      'Designed high-performance paginated REST APIs sustaining 5,000+ concurrent requests.',
      'Delivered an operations workflow tool cutting average incident resolution time by 25%.',
    ],
  },
  {
    role: 'Senior Associate Engineer (SDE-1)',
    company: '1k Kirana Bazar',
    location: 'Gurgaon, India',
    period: '01/2022 - 12/2022',
    type: 'Full-time',
    badge: '1 yr',
    tech: ['NestJS', 'MongoDB', 'Ag-Grid', 'Angular'],
    highlights: [
      'Developed a BD admin panel with NestJS and MongoDB to onboard 200+ retail stores.',
      'Integrated Ag-Grid with server-side XLSX export, reducing data retrieval latency by 50%.',
      'Designed reusable NestJS interceptors and guards for request validation and audit logging.',
    ],
  },
  {
    role: 'Software Development Engineer (SDE-1)',
    company: 'LTI Mindtree LTD',
    location: 'Bengaluru, India',
    period: '07/2020 - 01/2022',
    type: 'Full-time',
    badge: '1.5 yrs',
    tech: ['Angular', 'NgRx', 'RxJS', 'NestJS', 'Node.js'],
    highlights: [
      "Built P&G Japan's internal retail management tool using Angular, NgRx, and RxJS; reduced UI re-render overhead by 30%.",
      'Implemented server-side Excel export and retail/wholesale tiered pricing services across 3 markets.',
    ],
  },
  {
    role: 'Campus Intern',
    company: 'LTI Mindtree Limited',
    location: 'Bhubaneswar, India',
    period: '01/2020 - 07/2020',
    type: 'Internship',
    badge: 'Internship',
    tech: ['NestJS', 'MongoDB', 'Angular', 'RxJS', 'Firebase'],
    highlights: [
      'Developed the Mindtree Shopping App with NestJS, MongoDB, Angular, and RxJS.',
      'Optimized deployment with CI/CD pipelines and Firebase integration.',
    ],
  },
];

const ExperienceCard = ({ exp, index, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: index * 0.12, ease }}
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    className="editorial-card p-6 sm:p-8 group"
  >
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <motion.span
            className="font-sans text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1"
            style={{
              background: exp.badge === 'Current' ? 'var(--tomato)' : 'var(--royal)',
              color: '#FFFFFF',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.12 + 0.3, duration: 0.5, ease }}
          >
            {exp.badge}
          </motion.span>
          <span className="font-sans text-[10px] tracking-[0.1em] uppercase" style={{ color: 'var(--text-muted)' }}>
            {exp.type}
          </span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-bright)' }}>
          {exp.role}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="font-sans text-sm font-semibold" style={{ color: 'var(--royal)' }}>{exp.company}</span>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <span className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{exp.location}</span>
        </div>
      </div>
      <span className="font-mono text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>{exp.period}</span>
    </div>

    {exp.project && (
      <motion.div
        className="font-mono text-[11px] mb-4 px-3 py-1.5 inline-block border"
        style={{ borderColor: 'var(--border)', color: 'var(--tomato)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.4, duration: 0.5, ease }}
      >
        {exp.project}
      </motion.div>
    )}

    <ul className="space-y-2 mb-5">
      {exp.highlights.map((h, i) => (
        <motion.li
          key={i}
          className="flex items-start gap-3 font-sans text-sm"
          style={{ color: 'var(--text-mid)' }}
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.12 + 0.5 + i * 0.08, duration: 0.5, ease }}
        >
          <HiArrowRight size={12} className="mt-1.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--royal)' }} />
          <span>{h}</span>
        </motion.li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-2">
      {exp.tech.map((t, i) => (
        <motion.span
          key={t}
          className="font-mono text-[10px] px-2 py-0.5 border transition-all duration-300 hover:border-current cursor-default"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.7 + i * 0.03, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1, color: 'var(--royal)' }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="experience" className="section-padding relative" style={{ background: 'var(--bg-surface)' }}>
      <div ref={ref} className="page-container max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-number">02.</span>
          <span className="section-label">Career Journey</span>
          <motion.div
            className="flex-1 h-px"
            style={{ background: 'var(--border)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.0, ease }}
          />
        </motion.div>

        <div className="overflow-hidden mb-12">
          <motion.h2
            className="editorial-heading text-[clamp(2.5rem,6vw,4.5rem)]"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            Work{' '}
            <span style={{ color: 'var(--royal)' }}>Experience</span>
          </motion.h2>
        </div>

        {/* Timeline line */}
        <div className="relative">
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'var(--border)' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.5, ease }}
          />
          <div className="space-y-6 md:pl-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-8 top-8 w-3 h-3 border-2 rounded-full hidden md:block"
                  style={{
                    borderColor: exp.badge === 'Current' ? 'var(--tomato)' : 'var(--royal)',
                    background: 'var(--bg-surface)',
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 300 }}
                />
                <ExperienceCard exp={exp} index={i} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
