import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollSound } from '../hooks/useScrollSound';
import TronLetters from './TronLetters';

const skillCategories = [
  {
    category: 'Programming Languages',
    emoji: '💻',
    color: 'from-[#f15153] to-[#ff6d6f]',
    skills: [
      { name: 'JavaScript / TypeScript', level: 98 },
      { name: 'GoLang', level: 98 },
      { name: 'Python', level: 88 },
      { name: 'Java', level: 85 },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    color: 'from-[#f15153] to-[#d1548c]',
    skills: [
      { name: 'Node.js', level: 98 },
      { name: 'NestJS', level: 96 },
      { name: 'Gin (Go)', level: 96 },
      { name: 'Express.js', level: 95 },
      { name: 'gRPC', level: 91 },
      { name: 'BunJS', level: 90 },
    ],
  },
  {
    category: 'Frontend',
    emoji: '🎨',
    color: 'from-[#d1548c] to-[#a855f7]',
    skills: [
      { name: 'Angular', level: 96 },
      { name: 'React', level: 91 },
      { name: 'RxJS', level: 94 },
      { name: 'NgRx', level: 92 },
    ],
  },
  {
    category: 'Databases',
    emoji: '🗄️',
    color: 'from-[#a855f7] to-[#7c46b0]',
    skills: [
      { name: 'PostgreSQL', level: 95 },
      { name: 'MongoDB', level: 93 },
      { name: 'Redis', level: 94 },
      { name: 'MySQL', level: 91 },
      { name: 'Firebase', level: 90 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    emoji: '☁️',
    color: 'from-[#f98b8d] to-[#d1548c]',
    skills: [
      { name: 'Docker', level: 96 },
      { name: 'Kubernetes', level: 92 },
      { name: 'AWS (EC2, S3, SQS, Lambda)', level: 92 },
      { name: 'CI/CD Pipelines', level: 91 },
    ],
  },
  {
    category: 'AI & LLM Infrastructure',
    emoji: '🧠',
    color: 'from-[#a855f7] to-[#f15153]',
    skills: [
      { name: 'LLM Infrastructure', level: 90 },
      { name: 'RAG Pipelines', level: 88 },
      { name: 'Prompt Orchestration', level: 89 },
      { name: 'AI Agent Backends', level: 87 },
    ],
  },
  {
    category: 'Architecture & Messaging',
    emoji: '🏗️',
    color: 'from-[#ff6d6f] to-[#f15153]',
    skills: [
      { name: 'Microservices', level: 97 },
      { name: 'Kafka (Confluent)', level: 91 },
      { name: 'AWS SQS', level: 92 },
      { name: 'HLD / LLD', level: 95 },
    ],
  },
];

const techBadges = [
  'GoLang', 'NestJS', 'Node.js', 'Angular', 'React', 'TypeScript',
  'Python', 'PostgreSQL', 'Redis', 'MongoDB', 'MySQL', 'Kafka', 'Docker', 'Kubernetes',
  'LLM Infrastructure', 'RAG', 'AI Agents',
  'AWS EC2', 'AWS S3', 'AWS SQS', 'AWS Lambda', 'Route 53', 'CloudWatch',
  'gRPC', 'RxJS', 'NgRx', 'Gin', 'Firebase', 'CI/CD',
  'Grafana', 'Kibana', 'Git', 'Bitbucket', 'PM2', 'BunJS',
];

const SkillBar = ({ name, level, color, delay, isInView }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1.5">
      <span className="font-grotesk text-sm text-[var(--text-mid)]">{name}</span>
      <motion.span
        className="font-space-mono text-[10px] text-[var(--text-muted)]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.35 }}
      >
        {level}%
      </motion.span>
    </div>
    <div className="glass-chip h-2 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full rounded-full bg-gradient-to-r ${color} skill-bar relative`}
      />
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const soundRef = useScrollSound('section', 0.2);

  return (
    <section id="skills" ref={soundRef} className="section-padding relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none anim-orb-pulse"
        style={{ background: 'radial-gradient(circle, var(--orb-1) 0%, transparent 70%)', animationDuration: '10s' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none anim-orb-pulse"
        style={{ background: 'radial-gradient(circle, var(--orb-2) 0%, transparent 70%)', animationDuration: '12s', animationDelay: '1s' }}
      />

      <div ref={ref} className="relative z-10 page-container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="terminal-label">What I work with</span>
          <h2 className="display-heading section-title text-[var(--text-bright)] mt-3">
            <TronLetters text="TECHNICAL " inView={isInView} delay={0.1} />
            <TronLetters text="SKILLS" className="gradient-text" inView={isInView} delay={0.55} />
          </h2>
          <motion.div
            className="w-24 h-[3px] rounded-full mx-auto mt-6"
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
            style={{
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, var(--red), var(--magenta), var(--orchid))',
            }}
          />
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 18 } }}
              className="tron-card glow-border glass rounded-xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.emoji}</span>
                <h3 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.color}`}>
                  {cat.category}
                </h3>
              </div>
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={catIndex * 0.1 + i * 0.1}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* All tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="font-space-mono text-xs text-[var(--text-muted)] mb-6 tracking-[0.25em] uppercase">Full Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.03, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="tron-badge glass-chip font-space-mono px-4 py-2 rounded-md text-[10px] font-medium text-[var(--text-mid)] cursor-default tracking-wider"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
