import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TronGhibliCanvas from './components/TronGhibliCanvas';
import EnterGate from './components/EnterGate';

function App() {
  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-bright)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <TronGhibliCanvas />
      <EnterGate />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Blogs />
          <Contact />
        </main>
        <Footer />
      </div>
    </motion.div>
  );
}

export default App;
