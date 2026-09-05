import { useRef,useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import portraitImg from '../assets/portrait2.png';
import '../styles/About.css';


const STATS = [
  { value: '3-4', label: 'Years coding & learning' },
  { value: '4-6', label: 'Projects shipped' },
  { value: '10+', label: 'Technologies used' },
];

const SKILLS = [
  'Python', 'SQL', 'JavaScript', 'React', 'Node.js', 'FastAPI',
  'MongoDB', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics',
  'Machine Learning', 'Data Analysis', 'Data Engineering',
  'REST APIs', 'LLM Integration', 'Gemini', 'Mistral', 'OpenChat',
  'AI Product Development', 'Full-Stack Development',
  'Docker', 'Git', 'GitHub', 'MCP', 'Figma',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const pinRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  const [skillsMode, setSkillsMode] = useState('marquee'); 
  const hoverTimeoutRef = useRef(null);

  const handleSkillsEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setSkillsMode('vertical');
    }, 500); 
  };

  const handleSkillsLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setSkillsMode('marquee');
  };

  // Single continuous range per transform — no overlapping/competing
  // animation windows, which was the source of the scroll judder.
  const bioScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.5, 0.5, 0]);
  const statStripX = useTransform(scrollYProgress, [0, 1], ['10%', '15%']);
  const skillsStripX = useTransform(scrollYProgress, [0, 1], ['-40%', '-20%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [180, 0]);

  return (
    <section id="about" className="about" ref={pinRef}>
      <div className="about__pin">
        <motion.span className="about__bg-number" style={{ y: numberY, opacity: numberOpacity }}>
          02
        </motion.span>

        <div className="about__top">
          <motion.div className="about__intro" style={{ scale: bioScale }}>
            <motion.span
              className="about__eyebrow"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: '-15%' }}
              custom={0}
              variants={fadeUp}
            >
              ABOUT — 02
            </motion.span>

            <motion.h2
              className="about__heading"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: '-15%' }}
              custom={0.1}
              variants={fadeUp}
            >
              Still learning,
              <br />
              already building.
            </motion.h2>

            <motion.p
              className="about__bio"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: '-15%' }}
              custom={0.25}
              variants={fadeUp}
            >
              I’m pursuing an MSc in Data Science & Analytics, building on a BCA background and hands-on full-stack development experience. My focus is on creating data-driven and AI-powered products using Python, SQL, FastAPI, React, Node.js, and MongoDB. I’ve worked on an AI career intelligence platform, integrated LLMs such as Gemini, Mistral, and OpenChat into practical applications, and built responsive production-ready interfaces during my internship. I’m especially drawn to projects where data, AI, and thoughtful software engineering come together to solve real problems.
            </motion.p>

            <motion.p
              className="about__bio about__bio--secondary"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: '-15%' }}
              custom={0.35}
              variants={fadeUp}
            >
              Most of what I know, I picked up by breaking things first —
              running experiments, reading protocol docs line by line, and
              treating every project like a small research question with a
              working demo at the end.
            </motion.p>
          </motion.div>

          <motion.div
            className="about__portrait"
            style={{ y: portraitY, rotate: portraitRotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={portraitImg} alt="Portrait" />
            <span className="about__portrait-tag">HAND-CODED / 2026</span>
          </motion.div>
        </div>

        <div className="about__stats-track">
          <div className="about__stats-row">
            <motion.div className="about__stats" style={{ x: statStripX }}>
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="about__stat"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: '-10%' }}
                  custom={0.1 + i * 0.12}
                  variants={fadeUp}
                >
                  <span className="about__stat-value">{stat.value}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="about__ring"
            style={{ rotate: ringRotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 200 200" fill="none">
              <defs>
                <path id="ringPath" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="92" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="4 10" />
              <circle cx="100" cy="100" r="70" stroke="rgba(10,10,10,0.4)" strokeWidth="1" />
              <text className="about__ring-text">
                <textPath href="#ringPath" startOffset="0%">
                  BUILD · BREAK · REPEAT · BUILD · BREAK · REPEAT ·
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        <div
          className={`about__skills-track ${skillsMode === 'vertical' ? 'about__skills-track--vertical' : ''}`}
          onMouseEnter={handleSkillsEnter}
          onMouseLeave={handleSkillsLeave}
        >
          <motion.div
            className="about__skills"
            style={skillsMode === 'marquee' ? { x: skillsStripX } : {}}
            animate={skillsMode === 'marquee' ? { x: ['0%', '-50%'] } : { x: 0 }}
            transition={skillsMode === 'marquee' ? { duration: 23, ease: 'linear' } : { duration: 0.4 }}
          >
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span key={`${skill}-${i}`} className="about__skill">
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}