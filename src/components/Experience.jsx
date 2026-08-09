import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';
import { useScrollSound } from '../hooks/useScrollSound';
import TronLetters from './TronLetters';

const experiences = [
  {
    role: 'Senior Software Engineer 3 (SDE-3)',
    company: 'Vola Finance',
    location: 'Bengaluru, India',
    period: '04/2025 – Present',
    type: 'Full-time',
    color: 'from-[#f15153] to-[#ff6d6f]',
    badge: 'Current',
    project: 'Gentoo App – Microfinance Platform (Spain)',
    tech: ['NestJS', 'Node.js', 'Go (Gin)', 'ConnectPay', 'Bank of Lithuania', 'PostgreSQL', 'Redis', 'AWS S3', 'AWS Lambda', 'CloudWatch', 'Docker', 'Kubernetes'],
    highlights: [
      'Architected a modular microfinance platform using NestJS and Node.js serving 10,000+ daily active users, enabling secure end-to-end financial services for the Spanish market.',
      'Integrated ConnectPay and Bank of Lithuania APIs for full BaaS capabilities — IBAN provisioning, KYC identity verification, card issuance, and real-time SEPA payment processing, reducing onboarding time by 60%.',
      'Designed event-driven architecture leveraging Redis pub/sub with transaction-safe workflows, retry mechanisms, and idempotency guarantees, achieving 99.9% payment flow reliability.',
      'Built i18n multi-language support with dynamic content resolution for EU regulatory compliance; reduced compliance review cycles by 40%.',
      'Developed a high-concurrency Go (Gin) scheduler handling 500+ daily reconciliation jobs and audit trail generation with fault-tolerant error handling and zero data loss.',
    ],
  },
  {
    role: 'Senior Software Engineer (SDE-2)',
    company: 'BluSmart Mobility',
    location: 'Gurgaon, India',
    period: '12/2022 – 04/2025',
    type: 'Full-time',
    color: 'from-[#f15153] to-[#d1548c]',
    badge: '2.4 yrs',
    tech: ['Go (Gin)', 'Node.js', 'Angular 17', 'Angular 15', 'Redis', 'PostgreSQL', 'Kubernetes', 'AWS EC2', 'AWS S3', 'Route 53', 'CloudWatch', 'Kafka', 'Docker'],
    highlights: [
      'Driver Application (TMS Module): Built a scalable Transport Management System in Go (Gin) and Node.js serving 8,000+ drivers, with dynamic form rendering, multilingual support, and role-based access control.',
      'Hub Dashboard (Angular 17): Engineered an operations web app for 50+ hubs covering cashbook, financial tracking, and regional localization; OnPush change detection reduced page load time by 35%.',
      'Hub Backend (Gin/GoLang): Designed high-performance paginated REST APIs sustaining 5,000+ concurrent requests with a modular architecture supporting independent microservice deployments.',
      'Incident Dashboard (Angular 15/Node.js): Delivered an operations workflow tool with urgency-based ticket prioritization and resolution analytics, cutting average incident resolution time by 25%.',
    ],
  },
  {
    role: 'Senior Associate Engineer (SDE-1)',
    company: '1k Kirana Bazar',
    location: 'Gurgaon, India',
    period: '01/2022 – 12/2022',
    type: 'Full-time',
    color: 'from-[#d1548c] to-[#a855f7]',
    badge: '1 yr',
    tech: ['NestJS', 'MongoDB', 'Ag-Grid', 'XLSX', 'Angular'],
    highlights: [
      'Developed a BD admin panel with NestJS and MongoDB to onboard 200+ retail stores, manage dynamic forms, multi-step approval workflows, and enforce ACL-based route security.',
      'Integrated Ag-Grid with server-side XLSX export and optimized REST APIs with cursor-based pagination and multi-field filtering, reducing data retrieval latency by 50%.',
      'Designed reusable NestJS interceptors and guards for request validation, audit logging, and role-based permission enforcement across all admin panel endpoints.',
    ],
  },
  {
    role: 'Software Development Engineer (SDE-1)',
    company: 'LTI Mindtree LTD',
    location: 'Bengaluru, India',
    period: '07/2020 – 01/2022',
    type: 'Full-time',
    color: 'from-[#a855f7] to-[#7c46b0]',
    badge: '1.5 yrs',
    tech: ['Angular', 'NgRx', 'RxJS', 'NestJS', 'Node.js'],
    highlights: [
      "Built P&G Japan's internal retail management tool using Angular, NgRx, and RxJS with real-time inventory and pricing logic; reactive state management reduced UI re-render overhead by 30%.",
      'Implemented server-side Excel export, dynamic PDF generation, and retail/wholesale tiered pricing services with multi-currency conversions, supporting 15+ product categories across 3 markets.',
    ],
  },
  {
    role: 'Campus Intern',
    company: 'LTI Mindtree Limited',
    location: 'Bhubaneswar, India',
    period: '01/2020 – 07/2020',
    type: 'Internship',
    color: 'from-[#7c46b0] to-[#4d2870]',
    badge: 'Internship',
    tech: ['NestJS', 'MongoDB', 'Angular', 'RxJS', 'Firebase', 'CI/CD'],
    highlights: [
      'Developed the Mindtree Shopping App with NestJS, MongoDB, Angular, and RxJS for real-time functionalities.',
      'Optimized deployment with CI/CD pipelines and Firebase integration.',
    ],
  },
];

const ExperienceCard = ({ exp, index, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, delay: index * 0.12 }}
    className="relative"
  >
    {/* Timeline dot */}
    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 300 }}
        className={`relative w-5 h-5 rounded-full bg-gradient-to-br ${exp.color} shadow-lg`}
      >
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${exp.color}`}
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        />
      </motion.div>
    </div>

    <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="tron-card glow-border glass rounded-2xl p-4 sm:p-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
          <div className="min-w-0">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${exp.color} text-white mb-2 inline-block`}>
              {exp.badge}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-bright)]">{exp.role}</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
              <FaBriefcase className="text-[#f15153] shrink-0" size={12} />
              <span className="text-[#f15153] font-semibold text-sm font-grotesk">{exp.company}</span>
              <span className="text-[var(--text-muted)] text-sm">· {exp.location}</span>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs text-[var(--text-muted)] font-mono shrink-0 sm:mt-1 tracking-wider">{exp.period}</span>
        </div>

        {/* Project */}
        {exp.project && (
          <div className="glass-chip text-xs text-[var(--magenta)] font-mono mb-3 px-2.5 py-1 rounded-lg inline-block">
            📁 {exp.project}
          </div>
        )}

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-mid)]">
              <HiChevronRight className="text-[#f15153] mt-0.5 shrink-0" size={16} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.1, y: -2 }}
              className="tron-badge glass-chip font-space-mono text-[9px] px-2 py-0.5 rounded text-[var(--text-mid)]"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const soundRef = useScrollSound('boop', 0.2);

  return (
    <section id="experience" ref={soundRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] aspect-square bg-[#e8d0ff]/40 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 page-container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="terminal-label">Career Journey</span>
          <h2 className="display-heading section-title text-[var(--text-bright)] mt-3">
            <TronLetters text="WORK " inView={isInView} delay={0.1} />
            <TronLetters text="EXPERIENCE" className="gradient-text" inView={isInView} delay={0.44} />
          </h2>
          <motion.div
            className="w-24 h-[3px] bg-gradient-to-r from-[#f15153] via-[#d1548c] to-[#a855f7] rounded-full mx-auto mt-6"
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Center line — grows in as section appears */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{ background: 'linear-gradient(to bottom, var(--red), var(--magenta), var(--orchid))', opacity: 0.45 }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
