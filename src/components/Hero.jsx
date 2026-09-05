import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Grain from './Grain';
import TexturedHeadline from './TexturedHeadline';
import TiltPanel from './TiltPanel';
import '../styles/Hero.css';
import PortraitDisc from './PortraitDisc';
import portraitImg from '../assets/portrait.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Each layer scrolls at a different rate — the depth illusion.
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yBio = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yPanels = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yOrnamentLeft = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yOrnamentRight = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={sectionRef} className="hero">

      <Grain />

      <motion.span className="ornament ornament--left" style={{ y: yOrnamentLeft }}>
        <DiamondRow />
      </motion.span>
      <motion.span className="ornament ornament--right" style={{ y: yOrnamentRight }}>
        <DiamondRow />
      </motion.span>

      <motion.div className="hero__inner" style={{ opacity: fade, scale }}>
        <motion.div style={{ y: yHeadline }}>
          <TexturedHeadline text="A-CODE" className="hero__headline" scrollYProgress={scrollYProgress} />
        </motion.div>

        <motion.p
          className="hero__lede"
          style={{ y: yBio }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.2}
          variants={fadeUp}
        >
          Data Science and AI enthusiast building intelligent, data-driven products with Python, SQL, FastAPI, React, Node.js, and MongoDB. Experienced in integrating LLMs including Gemini, Mistral, and OpenChat, with work spanning an intelligent web-applications, analytics-focused solutions, and scalable full-stack web applications. Currently expanding into machine learning, data engineering, visualization, and AI product engineering.
        </motion.p>
      <PortraitDisc src={portraitImg} scrollYProgress={scrollYProgress} />


        <motion.div className="hero__grid">
          <motion.div
            className="hero__grid-left"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeUp}
          >
            <span className="hero__spark">
              <StarburstIcon />
            </span>
            <h2 className="hero__subhead">
              IS MORE
              <br />
              THAN SYNTAX
            </h2>
          </motion.div>

          <motion.p
            className="hero__body"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.25}
            variants={fadeUp}
          >
            Let the logic take over. In every function there's structure —
            structure to build, to break, to rebuild better. Data, systems,
            and stubborn bugs are the raw material; the goal is always the
            same: turn an idea into something that actually runs.
          </motion.p>
        </motion.div>

        <motion.div className="hero__cards" style={{ y: yPanels }}>
          <TiltPanel className="hero__card">
            <span className="hero__card-label">01</span>
            <h3>Data &amp; Analytics</h3>
            <p>Python, SQL, statistics, visualization, and data-driven problem-solving for practical products.</p>
          </TiltPanel>
          <TiltPanel className="hero__card">
            <span className="hero__card-label">02</span>
            <h3>AI Integration</h3>
            <p>LLM-powered applications using Gemini, Mistral, and OpenChat to create useful intelligent experiences.</p>
          </TiltPanel>
          <TiltPanel className="hero__card">
            <span className="hero__card-label">03</span>
            <h3>Full-Stack Products</h3>
            <p>Scalable web applications with React, Node.js, FastAPI, and MongoDB - from interface to deployment.</p>
          </TiltPanel>
        </motion.div>

        <motion.div
          className="hero__footer"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.15}
          variants={fadeUp}
        >
          <span className="hero__footer-line" />
          <div className="hero__footer-row">
            <h3 className="hero__tagline">
              THE LOGIC OF
              <br />
              <span className="hero__tagline-outline">THE MACHINE</span>
            </h3>
            <div className="hero__stamp">
              <span>MSc DATA SCIENCE / 2026</span>
              <ArrowIcon />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span>SCROLL</span>
        <motion.span
          className="hero__scroll-line"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function DiamondRow() {
  return (
    <svg width="72" height="20" viewBox="0 0 72 20" fill="none">
      <rect x="1" y="1" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 1 L19 10 L10 19 L1 10 Z" stroke="currentColor" strokeWidth="1.2" fill="none" transform="translate(26 0)" />
      <rect x="53" y="1" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function StarburstIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <g stroke="currentColor" strokeWidth="1.4">
        <line x1="17" y1="1" x2="17" y2="33" />
        <line x1="1" y1="17" x2="33" y2="17" />
        <line x1="5.5" y1="5.5" x2="28.5" y2="28.5" />
        <line x1="28.5" y1="5.5" x2="5.5" y2="28.5" />
      </g>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 16L16 4M16 4H6M16 4V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
