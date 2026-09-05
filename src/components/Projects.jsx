import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Grain from './Grain';
import '../styles/Projects.css';
import TiltPanel from './TiltPanel';

// Edit this data — swap in real descriptions/links as projects finalize.
const PROJECTS = [
  {
    number: '01',
    title: 'AI Career Intelligence Platform',
    tag: 'AI / Data Product',
    description:
      'An AI-powered platform for career exploration, skill-gap analysis, personalised learning roadmaps, and exam preparation.',
    stack: ['React', 'Node.js', 'FastAPI', 'MongoDB', 'LLM Integration'],
    link: 'https://github.com/Aadish-KumarS/AI-powered-Career-Intelligent-Webapp',
    image: null,
  },
  {
    number: '02',
    title: 'AI-Powered Web Applications',
    tag: 'AI Integration / Full-Stack',
    description:
      'Full-stack applications that integrate modern LLMs such as Gemini, Mistral, and OpenChat to deliver practical, intelligent user experiences.',
    stack: ['Python', 'FastAPI', 'React', 'Gemini', 'Mistral'],
    link: '#',
    image: null,
  },
  {
    number: '03',
    title: 'Celebrare Frontend Internship',
    tag: 'Frontend / UI Engineering',
    description:
      'Transformed Figma designs into responsive, production-ready user interfaces, with a strong focus on clean implementation, usability, and attention to detail.',
    stack: ['React', 'JavaScript', 'Figma', 'Responsive Design'],
    link: '#',
    image: null,
  },
  {
    number: '04',
    title: 'MCP Server',
    tag: 'In Progress / AI Infrastructure',
    description:
      'Currently building a Model Context Protocol server to deepen my understanding of AI integrations, tool calling, and backend systems.',
    stack: ['Python', 'MCP SDK', 'Docker', 'REST APIs'],
    link: '#',
    image: null,
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
  const trackWrapRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current && trackWrapRef.current) {
        const overflow = trackRef.current.scrollWidth - trackWrapRef.current.clientWidth;
        console.log('scrollWidth:', trackRef.current.scrollWidth, 'clientWidth:', trackWrapRef.current.clientWidth, 'overflow:', overflow);
        setMaxScroll(Math.max(overflow, 0));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, PROJECTS.length - 1]);

  return (
    <section id="projects" className="projects" ref={pinRef} >
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
          ACTUALLY BUILT
        </motion.h2>

        <div className="projects__track-wrap" ref={trackWrapRef}>
        <motion.div className="projects__track"  ref={trackRef} style={{ x: trackX }}>
            {PROJECTS.map((project) => (
              <TiltPanel className="projects__card" key={project.number} intensity={6}>
                {/* <div className="projects__card-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <span className="projects__card-image-placeholder">{project.number}</span>
                  )}
                </div> */}
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
              </TiltPanel>
            ))}
          </motion.div>
        </div>

        <div className="projects__progress">
          <span className="projects__progress-count">
            <motion.span>{useTransform(activeIndex, (v) => String(Math.round(v) + 1).padStart(2, '0'))}</motion.span>
            {' / '}
            {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <div className="projects__progress-track">
            <motion.div className="projects__progress-fill" style={{ width: progressWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
}