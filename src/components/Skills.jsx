import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript / TypeScript', level: 98 },
      { name: 'GoLang', level: 98 },
      { name: 'Python', level: 88 },
      { name: 'Java', level: 85 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 98 },
      { name: 'NestJS', level: 96 },
      { name: 'Gin (Go)', level: 96 },
      { name: 'Express.js', level: 95 },
      { name: 'gRPC', level: 91 },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'Angular', level: 96 },
      { name: 'React', level: 91 },
      { name: 'RxJS', level: 94 },
      { name: 'NgRx', level: 92 },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 95 },
      { name: 'MongoDB', level: 93 },
      { name: 'Redis', level: 94 },
      { name: 'MySQL', level: 91 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'Docker', level: 96 },
      { name: 'Kubernetes', level: 92 },
      { name: 'AWS (EC2, S3, Lambda)', level: 92 },
      { name: 'CI/CD', level: 91 },
    ],
  },
  {
    category: 'AI & LLM',
    skills: [
      { name: 'LLM Infrastructure', level: 90 },
      { name: 'RAG Pipelines', level: 88 },
      { name: 'Prompt Orchestration', level: 89 },
      { name: 'AI Agent Backends', level: 87 },
    ],
  },
];

const techMarquee = [
  'GoLang', 'NestJS', 'Node.js', 'Angular', 'React', 'TypeScript',
  'Python', 'PostgreSQL', 'Redis', 'MongoDB', 'Kafka', 'Docker',
  'Kubernetes', 'LLM Infrastructure', 'RAG', 'AWS', 'gRPC', 'RxJS',
  'Grafana', 'Kibana', 'Git', 'PM2', 'BunJS',
];

const SkillBar = ({ name, level, delay, isInView }) => (
  <div className="mb-4 group">
    <div className="flex justify-between items-center mb-1.5">
      <span className="font-sans text-sm transition-colors duration-300 group-hover:text-[var(--royal)]" style={{ color: 'var(--text-mid)' }}>{name}</span>
      <motion.span
        className="font-mono text-[10px]"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.5 }}
      >
        {level}%
      </motion.span>
    </div>
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease }}
        className="h-full rounded-full skill-bar"
        style={{ background: 'var(--royal)' }}
      />
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const marqueeRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: marqueeRef, offset: ['start end', 'end start'] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section id="skills" className="section-padding relative">
      <div ref={ref} className="page-container max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-number">03.</span>
          <span className="section-label">What I Work With</span>
          <motion.div
            className="flex-1 h-px"
            style={{ background: 'var(--border)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.0, ease }}
          />
        </motion.div>

        <div className="overflow-hidden mb-14">
          <motion.h2
            className="editorial-heading text-[clamp(2.5rem,6vw,4.5rem)]"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            Technical{' '}
            <span style={{ color: 'var(--royal)' }}>Skills</span>
          </motion.h2>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIndex * 0.1, ease }}
              whileHover={{ y: -6, borderColor: 'var(--royal)', transition: { duration: 0.3 } }}
              className="editorial-card p-6"
            >
              <h3 className="font-serif text-lg font-bold mb-5" style={{ color: 'var(--text-bright)' }}>
                {cat.category}
              </h3>
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIndex * 0.1 + i * 0.08}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-width marquee outside container */}
      <div ref={marqueeRef} className="overflow-hidden py-10 border-t border-b" style={{ borderColor: 'var(--border)' }}>
        <motion.div className="marquee-track" style={{ x: marqueeX }}>
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold mx-8 whitespace-nowrap select-none"
              style={{
                color: i % 3 === 0 ? 'var(--royal)' : i % 3 === 1 ? 'var(--tomato)' : 'var(--text-muted)',
                opacity: i % 3 === 2 ? 0.3 : 1,
              }}
            >
              {tech}
              <span className="mx-6 text-base align-middle" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>&#10022;</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
