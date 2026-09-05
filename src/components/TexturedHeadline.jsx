import { useRef, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

export default function TexturedHeadline({
  text,
  className = '',
  scrollYProgress,
  distortRange = [0, 1],
  tag: Tag = 'h1',
}) {
  const filterId = useMemo(
    () => `noise-${text.replace(/\s/g, '-')}-${Math.random().toString(36).slice(2, 7)}`,
    [text]
  );

  const scale = useTransform(
    scrollYProgress ?? { get: () => 0 },
    distortRange,
    [8, 30]
  );

  const letters = text.split('');

  return (
    <Tag className={`textured-headline ${className}`} style={{ '--noise-filter': `url(#${filterId})` }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="3" seed="7" result="noise" />
          <motion.feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <span className="textured-headline__row">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="textured-headline__char"
            initial={{ opacity: 0, y: '0.6em', rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{
              duration: 0.75,
              delay: i * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}