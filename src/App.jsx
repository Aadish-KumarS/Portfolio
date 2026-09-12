import Hero from './components/Hero';
import './styles/TexturedHeadline.css';
import './styles/TiltPanel.css';
import Navbar from './components/Navbar';
import './styles/Navbar.css';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  return (
    <main>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
