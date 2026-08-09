import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { HiPaperAirplane } from 'react-icons/hi';
import { soundEngine } from '../utils/soundEngine';
import { useScrollSound } from '../hooks/useScrollSound';

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'aryanaman97@gmail.com', href: 'mailto:aryanaman97@gmail.com', color: 'text-[#ff6d6f]' },
  { icon: FaPhone, label: 'Phone', value: '+91 7528800424', href: 'tel:+917528800424', color: 'text-[#e478ac]' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Bengaluru, India', href: null, color: 'text-[#c084fc]' },
];

const socials = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn', color: 'hover:text-[#ff6d6f] hover:border-[#f15153]/50' },
  { icon: FaGithub, href: 'https://github.com/aryan297', label: 'GitHub', color: 'hover:text-[var(--text-bright)] hover:border-[rgba(50,24,71,0.35)]' },
  { icon: FaMedium, href: 'https://medium.com/@aryanaman97', label: 'Medium', color: 'hover:text-[#e478ac] hover:border-[#d1548c]/50' },
  { icon: FaNpm, href: 'https://www.npmjs.com/~aryan297', label: 'NPM', color: 'hover:text-[#c084fc] hover:border-[#a855f7]/50' },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const soundRef = useScrollSound('success', 0.2);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.success();
    const mailto = `mailto:aryanaman97@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" ref={soundRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-70 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-elevated), transparent)' }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none anim-orb-pulse"
        style={{ background: 'radial-gradient(circle, var(--orb-1) 0%, transparent 70%)', animationDuration: '11s' }}
      />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={ref} className="relative z-10 page-container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="terminal-label">Let&apos;s collaborate</span>
          <h2 className="display-heading section-title text-[var(--text-bright)] mt-3">
            <span>GET IN </span>
            <span className="glass-title inline-block mt-1 sm:mt-0">
              <span className="gradient-text">TOUCH</span>
            </span>
          </h2>
          <motion.div
            className="w-24 h-[3px] rounded-full mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, var(--red), var(--magenta), var(--orchid))',
            }}
          />
          <p className="font-grotesk text-[var(--text-mid)] text-sm sm:text-base mt-5 max-w-xl mx-auto px-1">
            I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to chat — my inbox is always open!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <motion.div
                key={label}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl glass-premium"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl glass-chip flex items-center justify-center shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-space-mono text-[9px] text-[var(--text-muted)] uppercase tracking-[0.25em] mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} className="font-grotesk text-[var(--text-bright)] font-medium hover:text-[#f15153] transition-colors text-sm sm:text-base break-all">
                      {value}
                    </a>
                  ) : (
                    <span className="font-grotesk text-[var(--text-bright)] font-medium text-sm sm:text-base">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div>
              <p className="font-space-mono text-[9px] text-[var(--text-muted)] mb-4 tracking-[0.2em] uppercase">// Find me online</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl glass-chip flex items-center justify-center text-[var(--text-mid)] transition-all ${color}`}
                    title={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl glass-premium"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: 'var(--red)' }} />
                <span className="text-[var(--red)] font-semibold text-sm">Available for opportunities</span>
              </div>
              <p className="text-[var(--text-mid)] text-sm">
                Looking for Senior Engineer roles in high-impact fintech, SaaS, or product companies.
                Open to remote and hybrid roles.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-5 sm:p-8 glass-premium space-y-4 sm:space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', placeholder: 'Your Name', type: 'text' },
                  { name: 'email', placeholder: 'Your Email', type: 'email' },
                ].map(({ name, placeholder, type }) => (
                  <div key={name}>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl glass-chip text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--red)] transition-all text-sm"
                    />
                  </div>
                ))}
              </div>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl glass-chip text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--red)] transition-all text-sm"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                required
                className="w-full px-4 py-3 rounded-xl glass-chip text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--red)] transition-all resize-none text-sm"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-4 rounded-xl font-space-mono font-semibold text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2"
              >
                {sent ? '✓ Message Sent!' : (
                  <>
                    <HiPaperAirplane className="rotate-45" size={18} />
                    Send Message
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
