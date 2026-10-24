import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaMapMarkerAlt, FaCode, FaRocket } from 'react-icons/fa';

const ease = [0.22, 1, 0.36, 1];

const stats = [
  { value: '6+',    label: 'Years Experience' },
  { value: '4',     label: 'Companies' },
  { value: '10+',   label: 'Major Projects' },
  { value: 'SDE-3', label: 'Current Level' },
];

const highlights = [
  { icon: FaMapMarkerAlt,  text: 'Bengaluru, India' },
  { icon: FaGraduationCap, text: 'B.E. Computer Science - Chandigarh University, 2020' },
  { icon: FaCode,          text: 'GoLang, Node.js, Angular, NestJS specialist' },
  { icon: FaRocket,        text: 'Microservices & Distributed Systems architect' },
];

const CountUp = ({ value, isInView }) => {
  const numericPart = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9]/g, '');

  if (!numericPart) return <>{value}</>;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Subtle decorative star */}
      <motion.div
        className="absolute top-20 right-16 hidden lg:block"
        style={{ y: parallaxY }}
      >
        <span className="text-2xl" style={{ color: 'var(--royal)', opacity: 0.2 }}>&#10022;</span>
      </motion.div>

      <div ref={ref} className="page-container max-w-6xl">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-number">01.</span>
          <span className="section-label">About Me</span>
          <motion.div
            className="flex-1 h-px"
            style={{ background: 'var(--border)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.0, ease }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease }}
          >
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="editorial-heading text-[clamp(2.5rem,6vw,4.5rem)]"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease }}
              >
                Building systems<br />
                <span style={{ color: 'var(--royal)' }}>that scale.</span>
              </motion.h2>
            </div>

            <div className="space-y-5 font-sans text-base leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              {[
                <>
                  I'm a <strong style={{ color: 'var(--text-bright)' }}>Results-driven Senior Software Engineer (SDE-3)</strong> with 6+ years
                  of experience designing and delivering high-performance, scalable backend systems and full-stack applications, currently at{' '}
                  <strong style={{ color: 'var(--tomato)' }}>Vola Finance</strong>, Bengaluru.
                </>,
                <>
                  My expertise spans building microfinance platforms, high-concurrency schedulers, event-driven architectures, and real-time dashboards — from backend APIs in{' '}
                  <strong style={{ color: 'var(--royal)' }}>GoLang</strong> and{' '}
                  <strong style={{ color: 'var(--royal)' }}>NestJS</strong> to powerful frontend experiences in{' '}
                  <strong style={{ color: 'var(--royal)' }}>Angular</strong>.
                </>,
                <>
                  Proven track record across fintech, mobility, and e-commerce domains — integrating BaaS providers,
                  building event-driven systems with Kafka & Redis, and shipping distributed products that scale to 10,000+ daily active users.
                </>,
              ].map((content, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease }}
                >
                  {content}
                </motion.p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-8 space-y-3">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease }}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 cursor-default"
                >
                  <Icon size={14} style={{ color: 'var(--royal)', flexShrink: 0 }} />
                  <span className="font-sans text-sm" style={{ color: 'var(--text-mid)' }}>{text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.5, ease }}
            >
              <motion.a
                href="mailto:aryanaman97@gmail.com"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-editorial-fill text-[10px] px-6 py-3"
              >
                Email Me
              </motion.a>
              <motion.a
                href="tel:+917528800424"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-editorial text-[10px] px-6 py-3"
              >
                +91 7528800424
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease }}
                  whileHover={{ y: -6, borderColor: 'var(--royal)', transition: { duration: 0.3 } }}
                  className="editorial-card p-6 sm:p-8 text-center group cursor-default"
                >
                  <motion.div
                    className="editorial-heading text-[clamp(2rem,5vw,3.5rem)] transition-colors duration-300"
                    style={{ color: 'var(--royal)' }}
                  >
                    <CountUp value={value} isInView={isInView} />
                  </motion.div>
                  <div className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase mt-2 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech pillars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6, ease }}
              className="editorial-card p-6 mt-4"
            >
              <div className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                Core Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {['GoLang', 'Node.js', 'NestJS', 'Angular', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'LLM Infra', 'AWS'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.0 + i * 0.04, type: 'spring', stiffness: 200 }}
                    whileHover={{
                      scale: 1.08,
                      y: -2,
                      borderColor: 'var(--royal)',
                      color: 'var(--royal)',
                      transition: { duration: 0.2 },
                    }}
                    className="font-sans text-[11px] font-medium px-3 py-1.5 border cursor-default transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-mid)' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
