import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import portraitImg from '../assets/portrait.jpg';
import './About.css';

const STATS = [
  { value: '3-4', label: 'Years coding & learning' },
  { value: '4-6', label: 'Projects shipped' },
  { value: '10+', label: 'Technologies used' },
];

const SKILLS = [
  'Python', 'JavaScript', 'React', 'Node.js', 'FastAPI',
  'Docker', 'Git', 'SQL', 'Pandas', 'REST APIs', 'MCP',
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

  // Single continuous range per transform — no overlapping/competing
  // animation windows, which was the source of the scroll judder.
  const bioScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.5, 0.5, 0]);
  const statStripX = useTransform(scrollYProgress, [0, 1], ['6%', '-20%']);
  const skillsStripX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

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
              I finished my BCA and I'm now pursuing an MSc in Data Science
              &amp; Analytics. Somewhere between coursework and curiosity, I
              started building real things — an MCP server from scratch to
              understand protocols instead of just reading about them, an AI
              content pipeline run as a controlled experiment, and full-stack
              apps that go from idea to something that actually runs. I like
              projects that teach me something a textbook can't.
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

        <div className="about__skills-track">
          <motion.div className="about__skills" style={{ x: skillsStripX }}>
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