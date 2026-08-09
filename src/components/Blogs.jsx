import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { soundEngine } from '../utils/soundEngine';
import TronLetters from './TronLetters';

const blogs = [
  {
    title: 'System Design',
    description: 'Deep dives into system design concepts, architectural patterns, distributed systems, scalability strategies, and real-world engineering trade-offs.',
    tags: ['Distributed Systems', 'Scalability', 'Architecture', 'Microservices', 'Databases'],
    color: 'from-[#f15153] via-[#d1548c] to-[#a855f7]',
    url: 'https://aryan-design.vercel.app/',
    label: 'aryan-design.vercel.app',
  },
];

const BlogCard = ({ blog, index, isInView }) => (
  <motion.a
    href={blog.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
    onMouseEnter={() => soundEngine.hover()}
    onClick={() => soundEngine.click()}
    className="group block tron-card glow-border glass rounded-2xl p-4 sm:p-6 cursor-pointer"
  >
    {/* Top bar accent */}
    <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${blog.color} mb-5 opacity-70 group-hover:opacity-100 transition-opacity`} />

    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-xl font-bold text-[var(--text-bright)] group-hover:text-[var(--red)] transition-colors">{blog.title}</h3>
      <HiExternalLink className="text-[#f15153]/60 group-hover:text-[#f15153] shrink-0 mt-1 transition-colors" size={18} />
    </div>

    <p className="text-sm text-[var(--text-mid)] leading-relaxed mb-4">{blog.description}</p>

    <div className="flex flex-wrap gap-1.5 mb-4">
      {blog.tags.map((tag) => (
        <motion.span
          key={tag}
          whileHover={{ scale: 1.1, y: -2 }}
          className="tron-badge glass-chip font-space-mono text-[9px] px-2 py-0.5 rounded text-[var(--text-mid)]"
        >
          {tag}
        </motion.span>
      ))}
    </div>

    <span className="font-space-mono text-[10px] text-[#f15153]/50 group-hover:text-[#f15153]/80 transition-colors tracking-wider">
      ↗ {blog.label}
    </span>
  </motion.a>
);

const Blogs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blogs" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none anim-orb-pulse"
        style={{ background: 'radial-gradient(circle, var(--orb-2) 0%, transparent 70%)', animationDuration: '12s' }}
      />

      <div ref={ref} className="relative z-10 page-container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="terminal-label">Writing & Knowledge</span>
          <h2 className="display-heading section-title text-[var(--text-bright)] mt-3">
            <TronLetters text="MY " inView={isInView} delay={0.1} />
            <TronLetters text="BLOGS" className="gradient-text" inView={isInView} delay={0.25} />
          </h2>
          <motion.div
            className="w-24 h-[3px] bg-gradient-to-r from-[#f15153] via-[#d1548c] to-[#a855f7] rounded-full mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Cards */}
        <div className={`grid gap-6 ${blogs.length > 1 ? 'sm:grid-cols-2' : 'max-w-xl mx-auto'}`}>
          {blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
