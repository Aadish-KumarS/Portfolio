import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/CustomCursor.css';

const RING_SPRING = { stiffness: 300, damping: 30, mass: 0.5 };
const DOT_SPRING = { stiffness: 800, damping: 35, mass: 0.2 };

function isTouchDevice() {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0)
  );
}

export default function CustomCursor() {
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  useEffect(() => {
    setEnabled(!isTouchDevice());
  }, []);

  const handleMove = useCallback(
    (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    },
    [rawX, rawY]
  );

  const handleOver = useCallback((e) => {
    const target = e.target.closest('[data-cursor]');
    if (target) {
      setIsHovering(true);
      setLabel(target.getAttribute('data-cursor') || '');
    } else {
      setIsHovering(false);
      setLabel('');
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleHide = () => setIsVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    window.addEventListener('blur', handleHide);
    document.documentElement.addEventListener('mouseleave', handleHide);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('blur', handleHide);
      document.documentElement.removeEventListener('mouseleave', handleHide);
    };
  }, [enabled, handleMove, handleOver]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className={`cursor-ring ${isHovering ? 'cursor-ring--active' : ''} ${
          isPressed ? 'cursor-ring--pressed' : ''
        }`}
        style={{ x: ringX, y: ringY, opacity: isVisible ? 1 : 0 }}
      >
        {label && <span className="cursor-ring__label">{label}</span>}
        <svg className="cursor-ring__crosshair" viewBox="0 0 60 60">
          <line x1="30" y1="0" x2="30" y2="14" />
          <line x1="30" y1="46" x2="30" y2="60" />
          <line x1="0" y1="30" x2="14" y2="30" />
          <line x1="46" y1="30" x2="60" y2="30" />
        </svg>
      </motion.div>
    </>
  );
}