import { useState } from 'react';
import { motion } from 'framer-motion';
import Grain from './Grain';
import '../styles/Skills.css';

// Edit this data — categories and skills are yours to finalize.
const CATEGORIES = [
  {
    id: 'languages',
    label: 'Languages & Data',
    number: '01',
    skills: [
      { name: 'Python', note: 'Data analysis, automation, AI integrations, and backend development.' },
      { name: 'SQL', note: 'Querying, analysing, and working with structured data.' },
      { name: 'JavaScript', note: 'Interactive frontend development and Node.js applications.' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & AI',
    number: '02',
    skills: [
      { name: 'FastAPI', note: 'Python APIs and services for data-driven applications.' },
      { name: 'React', note: 'Responsive, component-driven interfaces for web products.' },
      { name: 'Node.js', note: 'Backend services and full-stack application development.' },
      { name: 'Pandas', note: 'Data cleaning, exploration, and analysis workflows.' },
      { name: 'LLM Integration', note: 'Building AI features with Gemini, Mistral, and OpenChat.' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    number: '03',
    skills: [
      { name: 'MongoDB', note: 'Flexible data storage for modern web applications.' },
      { name: 'Git & GitHub', note: 'Version control and collaborative project workflows.' },
      { name: 'Docker', note: 'Containerising applications for consistent development environments.' },
      { name: 'Figma', note: 'Turning design concepts into responsive, production-ready interfaces.' },
      { name: 'Data Visualization', note: 'Communicating insights through clear, useful visual stories.' },
    ],
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

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section id="skills" className="skills">
      <Grain />

      <motion.span
        className="skills__eyebrow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-15%' }}
        custom={0}
        variants={fadeUp}
      >
        SKILLS — 03
      </motion.span>

      <motion.h2
        className="skills__heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-15%' }}
        custom={0.1}
        variants={fadeUp}
      >
        TOOLS OF
        <br />
        THE TRADE
      </motion.h2>

      <div className="skills__categories">
        {CATEGORIES.map((cat, catIndex) => (
          <motion.div
            key={cat.id}
            className="skills__category"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-10%' }}
            custom={0.15 + catIndex * 0.1}
            variants={fadeUp}
          >
            <div className="skills__category-head">
              <span className="skills__category-number">{cat.number}</span>
              <h3 className="skills__category-label">{cat.label}</h3>
            </div>

            <ul className="skills__list">
              {cat.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="skills__item"
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <span className="skills__item-name">{skill.name}</span>
                  <motion.span
                    className="skills__item-note"
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                      activeSkill === skill.name
                        ? { opacity: 1, height: 'auto' }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {skill.note}
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}