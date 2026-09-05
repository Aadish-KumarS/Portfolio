import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Wraps children in a panel that tilts in 3D toward the cursor position,
 * giving a "dimensional" depth feel on hover. Falls back to no tilt on
 * touch devices since there's no persistent pointer.
 */
export default function TiltPanel({ children, className = '', intensity = 12 }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);
  const glowX = useTransform(springX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(springY, [0, 1], ['0%', '100%']);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-panel ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="tilt-panel__glow"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(239,65,54,0.35), transparent 60%)`,
        }}
      />
      <div className="tilt-panel__content">{children}</div>
    </motion.div>
  );
}
