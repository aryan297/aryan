import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { HiPaperAirplane } from 'react-icons/hi';
import { soundEngine } from '../utils/soundEngine';
import { useScrollSound } from '../hooks/useScrollSound';

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'aryanaman97@gmail.com', href: 'mailto:aryanaman97@gmail.com', color: 'text-indigo-400' },
  { icon: FaPhone, label: 'Phone', value: '+91 7528800424', href: 'tel:+917528800424', color: 'text-cyan-400' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Bengaluru, India', href: null, color: 'text-emerald-400' },
];

const socials = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/40' },
  { icon: FaGithub, href: 'https://github.com/aryan297', label: 'GitHub', color: 'hover:text-white hover:border-white/40' },
  { icon: FaMedium, href: 'https://medium.com/@aryanaman97', label: 'Medium', color: 'hover:text-green-400 hover:border-green-400/40' },
  { icon: FaNpm, href: 'https://www.npmjs.com/~aryan297', label: 'NPM', color: 'hover:text-red-400 hover:border-red-400/40' },
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
    <section id="contact" ref={soundRef} className="section-padding relative overflow-hidden bg-slate-950/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-indigo-400 text-sm tracking-widest uppercase">Let's collaborate</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mt-4" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            I'm currently open to new opportunities. Whether you have a project in mind or just want to chat — my inbox is always open!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <motion.div
                key={label}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)]/80 border border-white/5 glow-border"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">{label}</div>
                  {href ? (
                    <a href={href} className="text-slate-200 font-medium hover:text-indigo-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-slate-200 font-medium">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div>
              <p className="text-slate-400 text-sm mb-4 font-mono">// Find me online</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl border border-white/10 bg-[var(--bg-card)]/80 flex items-center justify-center text-slate-400 transition-all ${color}`}
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
              className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-cyan-900/20 border border-indigo-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold text-sm">Available for opportunities</span>
              </div>
              <p className="text-slate-400 text-sm">
                Looking for Senior Engineer roles in high-impact fintech, SaaS, or product companies.
                Open to remote and hybrid roles.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 bg-[var(--bg-card)]/80 border border-white/5 glow-border space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)]/80 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm"
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
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)]/80 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)]/80 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none text-sm"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
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
