import { motion, useTransform } from 'framer-motion';
import '../styles/PortraitDisc.css';

/**
 * Circular, low-opacity portrait that rotates as the page scrolls —
 * a record/CD feel. Pass scrollYProgress down from the Hero section.
 */
export default function PortraitDisc({ src, scrollYProgress }) {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      className="portrait-disc"
      style={{ y }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-10%' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={src}
        alt="Portrait"
        className="portrait-disc__img"
        style={{ rotate }}
      />
    </motion.div>
  );
}