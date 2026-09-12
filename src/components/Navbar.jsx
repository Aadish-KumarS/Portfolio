import { motion } from 'framer-motion';
import '../styles/Navbar.css';
import { smoothScrollTo } from '../utils/smoothScroll';

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
      <a href="#top"
        className="navbar__mark"
        data-cursor="Top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'auto' });
          smoothScrollTo('#top', 1100);
        }}>A/
      </a>
      <nav className="navbar__links">
        {LINKS.map((link) => (
          <a key={link.href}
            href={link.href}
            className="navbar__link"
            data-cursor="Go"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo(link.href, 1100);
            }}>
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}