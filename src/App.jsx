import Hero from './components/Hero';
import './styles/TexturedHeadline.css';
import './styles/TiltPanel.css';
import Navbar from './components/Navbar';
import './styles/Navbar.css';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
