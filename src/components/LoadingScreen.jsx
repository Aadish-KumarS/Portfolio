import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/LoadingScreen.css';

const DURATION_MS = 1200; 
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let rafId;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setIsDone(true), 300);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="loading-screen"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loading-screen__inner">
            <span className="loading-screen__mark">C/</span>
            <span className="loading-screen__text">Loading</span>
            <span className="loading-screen__percent">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="loading-screen__bar-track">
            <motion.div
              className="loading-screen__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}