import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Grain from './Grain';
import '../styles/Contact.css';

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

function isInAppBrowser() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Instagram|FBAN|FBAV|Line\/|LinkedInApp|Twitter/i.test(ua);
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [fallback, setFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const fallbackTimer = useRef(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'someone'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (isInAppBrowser()) {
      setFallback(true);
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    anchor.rel = 'noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setFallback(true);
      }
    }, 1200);
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
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

          {fallback && (
            <div className="contact__fallback">
              <p>
                Didn't open your mail app? Email me directly at{' '}
                <strong>{CONTACT_EMAIL}</strong>.
              </p>
              <button
                type="button"
                className="contact__copy-btn"
                onClick={handleCopyEmail}
              >
                {copied ? 'Copied ✓' : 'Copy email'}
              </button>
            </div>
          )}
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