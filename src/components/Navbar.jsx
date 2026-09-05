import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#top" className="navbar__mark">C/</a>
      <nav className="navbar__links">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="navbar__link">
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}