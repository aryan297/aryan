import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const ease = [0.22, 1, 0.36, 1];

const contactInfo = [
  { icon: FaEnvelope,      label: 'Email',    value: 'aryanaman97@gmail.com', href: 'mailto:aryanaman97@gmail.com' },
  { icon: FaPhone,         label: 'Phone',    value: '+91 7528800424',        href: 'tel:+917528800424' },
  { icon: FaMapMarkerAlt,  label: 'Location', value: 'Bengaluru, India',      href: null },
];

const socials = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/aryan297',                       label: 'GitHub' },
  { icon: FaMedium,   href: 'https://medium.com/@aryanaman97',                   label: 'Medium' },
  { icon: FaNpm,      href: 'https://www.npmjs.com/~aryan297',                   label: 'NPM' },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:aryanaman97@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div ref={ref} className="page-container max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-number">05.</span>
          <span className="section-label">Get In Touch</span>
          <motion.div
            className="flex-1 h-px"
            style={{ background: 'var(--border)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.0, ease }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            <div className="overflow-hidden mb-6">
              <motion.h2
                className="editorial-heading text-[clamp(2.5rem,6vw,4.5rem)]"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ delay: 0.15, duration: 0.8, ease }}
              >
                Let&apos;s{' '}
                <span style={{ color: 'var(--royal)' }}>collaborate.</span>
              </motion.h2>
            </div>

            <motion.p
              className="font-sans text-base leading-relaxed mb-10"
              style={{ color: 'var(--text-mid)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease }}
            >
              I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to chat — my inbox is always open.
            </motion.p>

            {/* Contact info */}
            <div className="space-y-4 mb-10">
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease }}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                    style={{ borderColor: 'var(--border)', color: 'var(--royal)' }}
                    whileHover={{ borderColor: 'var(--royal)', scale: 1.05 }}
                  >
                    <Icon size={16} />
                  </motion.div>
                  <div>
                    <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} className="font-sans text-sm font-medium transition-colors hover:underline" style={{ color: 'var(--text-bright)' }}>
                        {value}
                      </a>
                    ) : (
                      <span className="font-sans text-sm font-medium" style={{ color: 'var(--text-bright)' }}>{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5, ease }}
            >
              <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                Find me online
              </div>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease }}
                    whileHover={{ y: -4, borderColor: 'var(--royal)', color: 'var(--royal)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-mid)' }}
                    title={label}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              className="mt-8 p-5 border"
              style={{ borderColor: 'var(--border)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5, ease }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--tomato)' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                <span className="font-sans text-sm font-semibold" style={{ color: 'var(--tomato)' }}>Available for opportunities</span>
              </div>
              <p className="font-sans text-sm" style={{ color: 'var(--text-mid)' }}>
                Looking for Senior Engineer roles in high-impact fintech, SaaS, or product companies.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            <form onSubmit={handleSubmit} className="editorial-card p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', placeholder: 'Your Name', type: 'text' },
                  { name: 'email', placeholder: 'Your Email', type: 'email' },
                ].map(({ name, placeholder, type }) => (
                  <motion.input
                    key={name}
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    whileFocus={{ borderColor: 'var(--royal)' }}
                    className="w-full px-4 py-3 border font-sans text-sm transition-all focus:outline-none"
                    style={{
                      borderColor: 'var(--border)',
                      background: 'transparent',
                      color: 'var(--text-bright)',
                    }}
                  />
                ))}
              </div>

              <motion.input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                whileFocus={{ borderColor: 'var(--royal)' }}
                className="w-full px-4 py-3 border font-sans text-sm transition-all focus:outline-none"
                style={{
                  borderColor: 'var(--border)',
                  background: 'transparent',
                  color: 'var(--text-bright)',
                }}
              />

              <motion.textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                required
                whileFocus={{ borderColor: 'var(--royal)' }}
                className="w-full px-4 py-3 border font-sans text-sm transition-all focus:outline-none resize-none"
                style={{
                  borderColor: 'var(--border)',
                  background: 'transparent',
                  color: 'var(--text-bright)',
                }}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="btn-editorial-fill w-full py-4 flex items-center justify-center gap-2 text-[11px]"
              >
                {sent ? 'Opening Email Client...' : (
                  <>
                    <span>Send Message</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                      <HiArrowRight size={14} />
                    </motion.span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
