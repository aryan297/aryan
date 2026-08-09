import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaMapMarkerAlt, FaCode, FaRocket, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useScrollSound } from '../hooks/useScrollSound';
import TronLetters from './TronLetters';
import { staggerContainer, staggerItem, easeOut } from '../utils/motion';

const stats = [
  { value: '6+', label: 'Years Experience', icon: '⚡' },
  { value: '4', label: 'Companies', icon: '🏢' },
  { value: '10+', label: 'Major Projects', icon: '🚀' },
  { value: 'SDE-3', label: 'Current Level', icon: '🎯' },
];

const highlights = [
  { icon: FaMapMarkerAlt, text: 'Bengaluru, India', color: 'text-[var(--red)]' },
  { icon: FaGraduationCap, text: 'B.E. Computer Science — Chandigarh University, 2020', color: 'text-[var(--red-soft)]' },
  { icon: FaCode, text: 'GoLang, Node.js, Angular, NestJS specialist', color: 'text-[var(--magenta)]' },
  { icon: FaRocket, text: 'Microservices & Distributed Systems architect', color: 'text-[var(--orchid)]' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const soundRef = useScrollSound('section', 0.2);


  return (
    <section id="about" ref={soundRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div ref={ref} className="relative z-10 page-container max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="terminal-label">Get to know me</span>
          <h2 className="display-heading section-title text-[var(--text-bright)] mt-3">
            <TronLetters text="ABOUT " inView={isInView} delay={0.1} />
            <TronLetters text="ME" className="gradient-text" inView={isInView} delay={0.44} />
          </h2>
          <motion.div
            className="w-24 h-[3px] rounded-full mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.55, ease: easeOut }}
            style={{
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, var(--red), var(--magenta), var(--orchid))',
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="space-y-4 sm:space-y-5 font-grotesk text-[var(--text-mid)] text-base sm:text-lg leading-relaxed"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <motion.p variants={staggerItem}>
                I'm a <span className="text-[var(--text-bright)] font-medium">Results-driven Senior Software Engineer (SDE-3)</span> with 6+ years
                of experience designing and delivering high-performance, scalable backend systems and full-stack applications, currently at{' '}
                <span className="text-[var(--red)] font-medium">Vola Finance</span>, Bengaluru.
              </motion.p>
              <motion.p variants={staggerItem}>
                My expertise spans building <span className="text-[var(--red)] font-medium">microfinance platforms</span>,
                high-concurrency schedulers, event-driven architectures, and real-time dashboards — from backend
                APIs in <span className="text-[var(--text-bright)] font-medium">GoLang (Gin)</span> and{' '}
                <span className="text-[var(--magenta)] font-medium">NestJS</span> to powerful frontend experiences
                in <span className="text-[var(--orchid)] font-medium">Angular</span>.
              </motion.p>
              <motion.p variants={staggerItem}>
                Proven track record across fintech, mobility, and e-commerce domains — integrating BaaS providers
                (ConnectPay, Bank of Lithuania), building event-driven systems with Kafka & Redis, and shipping
                distributed products that scale to 10,000+ daily active users.
              </motion.p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="mt-8 space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {highlights.map(({ icon: Icon, text, color }) => (
                <motion.div
                  key={text}
                  variants={staggerItem}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-3 rounded-lg px-2 py-1.5 -mx-2 transition-colors"
                >
                  <Icon className={`${color} mt-1 shrink-0`} size={16} />
                  <span className="text-[var(--text-mid)] text-sm">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.45 }}
            >
              <motion.a
                href="mailto:aryanaman97@gmail.com"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary font-space-mono text-[10px] tracking-[0.2em] px-6 py-3 font-semibold uppercase rounded-md"
              >
                EMAIL_ME
              </motion.a>
              <motion.a
                href="tel:+917528800424"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost font-space-mono text-[10px] tracking-[0.2em] px-6 py-3 font-semibold uppercase rounded-md"
              >
                +91 7528800424
              </motion.a>
              <motion.a
                href="https://www.instagram.com/aryantechstories"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="font-space-mono text-[10px] tracking-[0.2em] px-6 py-3 border border-[#e1306c]/40 text-[#e1306c] font-semibold uppercase hover:bg-[#e1306c]/10 transition-colors rounded-md flex items-center gap-2"
              >
                <FaInstagram size={14} />
                INSTAGRAM
              </motion.a>
              <motion.a
                href="https://www.youtube.com/channel/UCHW7m6lPRdwrVMNv9_GbrUQ/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="font-space-mono text-[10px] tracking-[0.2em] px-6 py-3 border border-[#ff0000]/40 text-[#ff0000] font-semibold uppercase hover:bg-[#ff0000]/10 transition-colors rounded-md flex items-center gap-2"
              >
                <FaYoutube size={14} />
                YOUTUBE
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {stats.map(({ value, label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="tron-card glow-border glass rounded-xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
                <div className="display-heading text-2xl sm:text-3xl gradient-text tron-counter">{value}</div>
                <div className="font-space-mono text-[var(--text-muted)] text-[8px] sm:text-[9px] mt-2 tracking-[0.15em] sm:tracking-[0.2em] uppercase">{label}</div>
              </motion.div>
            ))}

            {/* Tech pillars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: 'spring' }}
              className="col-span-2 rounded-xl p-5 glass-panel"
            >
              <div className="font-space-mono text-[9px] text-[var(--text-muted)] mb-4 uppercase tracking-[0.25em]">Core Tech Pillars</div>
              <div className="flex flex-wrap gap-2">
                {['GoLang', 'Node.js', 'NestJS', 'Angular', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'LLM Infra', 'AWS'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.06, type: 'spring', stiffness: 300 }}
                    className="tron-badge glass-chip font-space-mono px-3 py-1 rounded-md text-[10px] font-medium text-[var(--text-mid)]"
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
