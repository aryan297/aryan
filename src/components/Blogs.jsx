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
    color: 'from-cyan-500 to-indigo-500',
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
    whileHover={{ y: -6 }}
    onMouseEnter={() => soundEngine.hover()}
    onClick={() => soundEngine.click()}
    className="group block tron-card tron-data-border glow-border rounded-2xl p-6 bg-[var(--bg-card)]/80 border border-white/5 backdrop-blur-sm transition-all duration-300 cursor-pointer"
  >
    {/* Top bar accent */}
    <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${blog.color} mb-5 opacity-70 group-hover:opacity-100 transition-opacity`} />

    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-xl font-bold text-white group-hover:text-[#00d4c8] transition-colors">{blog.title}</h3>
      <HiExternalLink className="text-[#00d4c8]/60 group-hover:text-[#00d4c8] shrink-0 mt-1 transition-colors" size={18} />
    </div>

    <p className="text-sm text-slate-400 leading-relaxed mb-4">{blog.description}</p>

    <div className="flex flex-wrap gap-1.5 mb-4">
      {blog.tags.map((tag) => (
        <motion.span
          key={tag}
          whileHover={{ scale: 1.1, y: -2 }}
          className="tron-badge font-space-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#00d4c8]/8 text-[#00d4c8]/80 border border-[#00d4c8]/20"
        >
          {tag}
        </motion.span>
      ))}
    </div>

    <span className="font-space-mono text-[10px] text-[#00d4c8]/50 group-hover:text-[#00d4c8]/80 transition-colors tracking-wider">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="terminal-label">Writing & Knowledge</span>
          <h2 className="display-heading text-5xl md:text-7xl text-white mt-3">
            <TronLetters text="MY " inView={isInView} delay={0.1} />
            <TronLetters text="BLOGS" className="gradient-text" inView={isInView} delay={0.25} />
          </h2>
          <motion.div
            className="w-20 h-0.5 bg-gradient-to-r from-[#00d4c8] to-[#a78bfa] rounded-full mx-auto mt-5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
