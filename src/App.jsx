import Hero from './components/Hero';
import './styles/TexturedHeadline.css';
import './styles/TiltPanel.css';
import Navbar from './components/Navbar';
import './styles/Navbar.css';
import About from './components/About';

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
