import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Grain from './Grain';
import '../styles/Projects.css';

// Edit this data — swap in real descriptions/links as projects finalize.
const PROJECTS = [
  {
    number: '01',
    title: 'MCP Server',
    tag: 'Backend / Protocol',
    description:
      'A Model Context Protocol server built from scratch as a learning exercise — filesystem helper tools, written line by line to understand the protocol, not just use it.',
    stack: ['Python', 'MCP SDK', 'Docker'],
    link: '#',
  },
  {
    number: '02',
    title: 'AI Shorts Experiment',
    tag: 'AI Pipeline / Content',
    description:
      'A controlled experiment testing whether AI-generated short-form video can find a niche on Instagram and YouTube Shorts — LLM scripts, GenAI visuals, five niches, one fixed pipeline.',
    stack: ['LLM Scripting', 'Kling AI', 'CapCut'],
    link: '#',
  },
  {
    number: '03',
    title: 'AI Career Intelligence Web App',
    tag: 'Full-Stack / Final Year',
    description:
      'A multi-service career intelligence platform for my BCA final year — Node.js auth, FastAPI services, and a React frontend working together end to end.',
    stack: ['Node.js', 'FastAPI', 'React'],
    link: 'https://github.com/Aadish-KumarS/AI-powered-Career-Intelligent-Webapp',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Projects() {
  const pinRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  // Vertical scroll through the pinned section drives horizontal
  // translation of the track — this is what makes it a "scroll gallery"
  // without hijacking the scrollbar or requiring manual drag.
  const trackX = useTransform(scrollYProgress, [0, 1], ['2%', '-72%']);

  return (
    <section id="projects" className="projects" ref={pinRef}>
      <div className="projects__pin">
        <Grain />

        <motion.span
          className="projects__eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-15%' }}
          custom={0}
          variants={fadeUp}
        >
          PROJECTS — 04
        </motion.span>

        <motion.h2
          className="projects__heading"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-15%' }}
          custom={0.1}
          variants={fadeUp}
        >
          THINGS I'VE
          <br />
          ACTUALLY BUILT
        </motion.h2>

        <div className="projects__track-wrap">
          <motion.div className="projects__track" style={{ x: trackX }}>
            {PROJECTS.map((project) => (
              <article className="projects__card" key={project.number}>
                <span className="projects__card-number">{project.number}</span>
                <span className="projects__card-tag">{project.tag}</span>
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-desc">{project.description}</p>
                <ul className="projects__card-stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="projects__card-link"
                >
                  View repo →
                </a>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="projects__scroll-hint">
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}