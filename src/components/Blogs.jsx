import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const ease = [0.22, 1, 0.36, 1];

const blogs = [
  {
    title: 'System Design',
    description: 'Deep dives into system design concepts, architectural patterns, distributed systems, scalability strategies, and real-world engineering trade-offs.',
    tags: ['Distributed Systems', 'Scalability', 'Architecture', 'Microservices', 'Databases'],
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
    transition={{ duration: 0.7, delay: index * 0.12, ease }}
    className="group block editorial-card p-6 sm:p-8"
  >
    <div className="flex items-start justify-between gap-4 mb-4">
      <h3 className="font-serif text-2xl sm:text-3xl font-bold transition-colors duration-300" style={{ color: 'var(--text-bright)' }}>
        {blog.title}
      </h3>
      <motion.div
        className="shrink-0 mt-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{ color: 'var(--royal)' }}
      >
        <HiArrowRight size={20} style={{ transform: 'rotate(-45deg)' }} />
      </motion.div>
    </div>

    <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-mid)' }}>
      {blog.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-5">
      {blog.tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[10px] px-2 py-0.5 border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          {tag}
        </span>
      ))}
    </div>

    <span className="font-mono text-[11px] transition-colors duration-300" style={{ color: 'var(--royal)' }}>
      {blog.label}
    </span>
  </motion.a>
);

const Blogs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blogs" className="section-padding relative" style={{ background: 'var(--bg-surface)' }}>
      <div ref={ref} className="page-container max-w-4xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-number">04.</span>
          <span className="section-label">Writing & Knowledge</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </motion.div>

        <motion.h2
          className="editorial-heading text-[clamp(2.5rem,6vw,4.5rem)] mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          My{' '}
          <span style={{ color: 'var(--royal)' }}>Blogs</span>
        </motion.h2>

        <div className={`grid gap-6 ${blogs.length > 1 ? 'sm:grid-cols-2' : 'max-w-xl'}`}>
          {blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
