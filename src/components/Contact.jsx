import { useState } from 'react';
import { motion } from 'framer-motion';
import Grain from './Grain';
import '../styles/Contact.css';

// Edit these with your real handles/URLs.
const LINKS = [
  { label: 'Email', value: 'aadishkumarak90@gmail.com', href: 'mailto:aadishkumarak90@gmail.com' },
  { label: 'GitHub', value: '@Aadish-KumarS', href: 'https://github.com/Aadish-KumarS' },
  { label: 'LinkedIn', value: 'Aadish Kumar S', href: 'https://www.linkedin.com/in/aadish-kumar-s-a7016b1b3/' },
  { label: 'Instagram', value: '@aadishsuresh_', href: 'https://www.instagram.com/aadishsuresh_/' },
];

const CONTACT_EMAIL = 'aadishkumarak90@gmail.com';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'someone'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="contact">
      <Grain />

      <motion.span 
        className="contact__eyebrow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-15%' }}
        custom={0}
        variants={fadeUp}
      >
        CONTACT — 05
      </motion.span>

      <motion.h2
        className="contact__heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-15%' }}
        custom={0.1}
        variants={fadeUp}
      >
        LET'S BUILD
        <br />
        SOMETHING
        <br />
        <span className="contact__heading-outline">THAT RUNS</span>
      </motion.h2>

      <div className="contact__grid">
        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-10%' }}
          custom={0.2}
          variants={fadeUp}
        >
          <label className="contact__field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact__field">
            <span>Message</span>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="contact__submit">
            Send message →
          </button>
        </motion.form>

        <motion.div
          className="contact__links"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-10%' }}
          custom={0.3}
          variants={fadeUp}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="contact__link"
            >
              <span className="contact__link-label">{link.label}</span>
              <span className="contact__link-value">{link.value}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <motion.footer
        className="contact__footer"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-10%' }}
        custom={0.4}
        variants={fadeUp}
      >
        <span>SELF-TAUGHT / 2026</span>
        <span>DESIGNED &amp; BUILT FROM SCRATCH</span>
      </motion.footer>
    </section>
  );
}