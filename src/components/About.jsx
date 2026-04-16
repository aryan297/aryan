import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaMapMarkerAlt, FaCode, FaRocket } from 'react-icons/fa';
import { useScrollSound } from '../hooks/useScrollSound';
import TronLetters from './TronLetters';

const stats = [
  { value: '6+', label: 'Years Experience', icon: '⚡' },
  { value: '4', label: 'Companies', icon: '🏢' },
  { value: '10+', label: 'Major Projects', icon: '🚀' },
  { value: 'SDE-3', label: 'Current Level', icon: '🎯' },
];

const highlights = [
  { icon: FaMapMarkerAlt, text: 'Bengaluru, India', color: 'text-rose-400' },
  { icon: FaGraduationCap, text: 'B.E. Computer Science — Chandigarh University, 2020', color: 'text-yellow-400' },
  { icon: FaCode, text: 'GoLang, Node.js, Angular, NestJS specialist', color: 'text-cyan-400' },
  { icon: FaRocket, text: 'Microservices & Distributed Systems architect', color: 'text-emerald-400' },
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

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="terminal-label">Get to know me</span>
          <h2 className="display-heading text-5xl md:text-7xl text-white mt-3">
            <TronLetters text="ABOUT " inView={isInView} delay={0.1} />
            <TronLetters text="ME" className="gradient-text" inView={isInView} delay={0.44} />
          </h2>
          <motion.div
            className="w-20 h-0.5 bg-gradient-to-r from-[#00d4c8] to-[#a78bfa] rounded-full mx-auto mt-5"
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-5 font-grotesk text-[var(--text-mid)] text-lg leading-relaxed">
              <p>
                I'm a <span className="text-white font-semibold">Results-driven Senior Software Engineer (SDE-3)</span> with 6+ years
                of experience designing and delivering high-performance, scalable backend systems and full-stack applications, currently at{' '}
                <span className="text-[#00d4c8] font-semibold">Vola Finance</span>, Bengaluru.
              </p>
              <p>
                My expertise spans building <span className="text-[#00d4c8] font-semibold">microfinance platforms</span>,
                high-concurrency schedulers, event-driven architectures, and real-time dashboards — from backend
                APIs in <span className="text-white font-semibold">GoLang (Gin)</span> and{' '}
                <span className="text-[#00b4d8] font-semibold">NestJS</span> to powerful frontend experiences
                in <span className="text-[#a78bfa] font-semibold">Angular</span>.
              </p>
              <p>
                Proven track record across fintech, mobility, and e-commerce domains — integrating BaaS providers
                (ConnectPay, Bank of Lithuania), building event-driven systems with Kafka & Redis, and shipping
                distributed products that scale to 10,000+ daily active users.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 space-y-3">
              {highlights.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className={`${color} mt-1 shrink-0`} size={16} />
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <motion.div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="mailto:aryanaman97@gmail.com"
                className="font-space-mono text-[10px] tracking-[0.2em] px-6 py-3 bg-[#00d4c8] text-[#060c14] font-bold uppercase hover:bg-[#00e5d4] transition-colors rounded-sm"
              >
                EMAIL_ME
              </a>
              <a
                href="tel:+917528800424"
                className="font-space-mono text-[10px] tracking-[0.2em] px-6 py-3 border border-[#00d4c8]/40 text-[#00d4c8] font-bold uppercase hover:bg-[#00d4c8]/10 transition-colors rounded-sm"
              >
                +91 7528800424
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ value, label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="tron-card glow-border rounded-sm p-6 bg-[var(--bg-card)]/80 border border-[#00d4c8]/10 text-center"
              >
                <motion.div
                  className="text-3xl mb-2"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                >
                  {icon}
                </motion.div>
                <div className="display-heading text-3xl gradient-text tron-counter">{value}</div>
                <div className="font-space-mono text-[var(--text-muted)] text-[9px] mt-2 tracking-[0.2em] uppercase">{label}</div>
              </motion.div>
            ))}

            {/* Tech pillars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: 'spring' }}
              className="col-span-2 rounded-sm p-5 bg-gradient-to-br from-[#00d4c8]/5 to-[#a78bfa]/5 border border-[#00d4c8]/15"
            >
              <div className="font-space-mono text-[9px] text-[var(--text-muted)] mb-4 uppercase tracking-[0.25em]">Core Tech Pillars</div>
              <div className="flex flex-wrap gap-2">
                {['GoLang', 'Node.js', 'NestJS', 'Angular', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.06, type: 'spring', stiffness: 300 }}
                    className="tron-badge font-space-mono px-3 py-1 rounded-sm text-[10px] font-bold bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/25"
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
