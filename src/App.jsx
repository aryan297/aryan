import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TronGhibliCanvas from './components/TronGhibliCanvas';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-primary)', color: 'var(--text-bright)' }}>
      {/* Tron × Ghibli canvas background */}
      <TronGhibliCanvas />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
