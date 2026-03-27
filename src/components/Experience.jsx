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
    color: 'from-indigo-500 to-cyan-500',
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
    color: 'from-cyan-500 to-emerald-500',
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
    color: 'from-purple-500 to-pink-500',
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
    color: 'from-rose-500 to-orange-500',
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
    color: 'from-slate-500 to-slate-400',
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
    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
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
        whileHover={{ y: -6 }}
        className="tron-card tron-data-border glow-border rounded-2xl p-6 bg-[var(--bg-card)]/80 border border-white/5 backdrop-blur-sm transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${exp.color} text-white mb-2 inline-block`}>
              {exp.badge}
            </span>
            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <FaBriefcase className="text-indigo-400" size={12} />
              <span className="text-indigo-400 font-semibold text-sm">{exp.company}</span>
              <span className="text-slate-500 text-sm">· {exp.location}</span>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-mono shrink-0 mt-1 tracking-wider">{exp.period}</span>
        </div>

        {/* Project */}
        {exp.project && (
          <div className="text-xs text-cyan-400 font-mono mb-3 px-2 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20 inline-block">
            📁 {exp.project}
          </div>
        )}

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <HiChevronRight className="text-indigo-400 mt-0.5 shrink-0" size={16} />
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
              className="tron-badge text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono"
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tron-label font-mono text-indigo-400 text-sm tracking-widest uppercase">Career Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            <TronLetters text="Work " inView={isInView} delay={0.1} />
            <TronLetters text="Experience" className="gradient-text" inView={isInView} delay={0.44} />
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mt-4"
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/30 to-transparent -translate-x-1/2" />

          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
