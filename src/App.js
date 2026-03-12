import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Popup from './components/Popup';
import MouseLine from './components/MouseLine';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)]">
      <MouseLine />
      <Header />
      <main className="pt-[76px]">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Popup />
    </div>
  );
}

export default App;
