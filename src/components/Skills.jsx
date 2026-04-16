import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollSound } from '../hooks/useScrollSound';
import TronLetters from './TronLetters';

const skillCategories = [
  {
    category: 'Programming Languages',
    emoji: '💻',
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'JavaScript / TypeScript', level: 98 },
      { name: 'GoLang', level: 93 },
      { name: 'Python', level: 88 },
      { name: 'Java', level: 85 },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Node.js', level: 98 },
      { name: 'NestJS', level: 96 },
      { name: 'Gin (Go)', level: 93 },
      { name: 'Express.js', level: 95 },
      { name: 'gRPC', level: 91 },
      { name: 'BunJS', level: 90 },
    ],
  },
  {
    category: 'Frontend',
    emoji: '🎨',
    color: 'from-purple-500 to-pink-500',
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
    color: 'from-emerald-500 to-teal-500',
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
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'AWS (EC2, S3, SQS, Lambda)', level: 92 },
      { name: 'Kubernetes', level: 88 },
      { name: 'Docker', level: 94 },
      { name: 'CI/CD Pipelines', level: 91 },
    ],
  },
  {
    category: 'Architecture & Messaging',
    emoji: '🏗️',
    color: 'from-rose-500 to-red-500',
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
  'AWS EC2', 'AWS S3', 'AWS SQS', 'AWS Lambda', 'Route 53', 'CloudWatch',
  'gRPC', 'RxJS', 'NgRx', 'Gin', 'Firebase', 'CI/CD',
  'Grafana', 'Kibana', 'Git', 'Bitbucket', 'PM2', 'BunJS',
];

const SkillBar = ({ name, level, color, delay, isInView }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1.5">
      <span className="font-grotesk text-sm text-[var(--text-mid)]">{name}</span>
      <span className="font-space-mono text-[10px] text-[var(--text-muted)]">{level}%</span>
    </div>
    <div className="h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
        className={`h-full rounded-full bg-gradient-to-r ${color} skill-bar`}
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="terminal-label">What I work with</span>
          <h2 className="display-heading text-5xl md:text-7xl text-white mt-3">
            <TronLetters text="TECHNICAL " inView={isInView} delay={0.1} />
            <TronLetters text="SKILLS" className="gradient-text" inView={isInView} delay={0.55} />
          </h2>
          <motion.div
            className="w-20 h-0.5 bg-gradient-to-r from-[#00d4c8] to-[#a78bfa] rounded-full mx-auto mt-5"
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              whileHover={{ y: -6 }}
              className="tron-card glow-border rounded-sm p-6 bg-[var(--bg-card)]/80 border border-[#00d4c8]/8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3 + catIndex * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >{cat.emoji}</motion.span>
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
                className="tron-badge font-space-mono px-4 py-2 rounded-sm text-[10px] font-bold bg-[var(--bg-card)] border border-[#00d4c8]/15 text-[var(--text-mid)] cursor-default tracking-wider"
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
