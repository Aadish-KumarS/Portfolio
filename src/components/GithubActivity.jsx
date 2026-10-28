import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Grain from './Grain';
import '../styles/GithubActivity.css';

const USERNAME = 'Aadish-KumarS';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function formatEvent(event) {
  const repo = event.repo?.name?.split('/')[1] || event.repo?.name;
  switch (event.type) {
    case 'PushEvent': {
      const count = event.payload?.commits?.length || 1;
      return `Pushed ${count} commit${count > 1 ? 's' : ''} to ${repo}`;
    }
    case 'CreateEvent':
      return `Created ${event.payload?.ref_type || 'repo'} in ${repo}`;
    case 'PullRequestEvent':
      return `${event.payload?.action === 'opened' ? 'Opened' : 'Updated'} a pull request in ${repo}`;
    case 'IssuesEvent':
      return `${event.payload?.action === 'opened' ? 'Opened' : 'Updated'} an issue in ${repo}`;
    case 'WatchEvent':
      return `Starred ${repo}`;
    case 'ForkEvent':
      return `Forked ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function GithubActivity() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=6`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section id="github" className="github">
      <Grain />

      <motion.span
        className="github__eyebrow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-15%' }}
        custom={0}
        variants={fadeUp}
      >
        ACTIVITY — 06
      </motion.span>

      <motion.h2
        className="github__heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-15%' }}
        custom={0.1}
        variants={fadeUp}
      >
        STILL
        <br />
        COMMITTING
      </motion.h2>

      <motion.div
        className="github__heatmap"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-10%' }}
        custom={0.2}
        variants={fadeUp}
      >
        <img
          src={`https://ghchart.rshah.org/ef4136/${USERNAME}`}
          alt={`${USERNAME}'s GitHub contribution graph`}
          className="github__heatmap-img"
        />
      </motion.div>

      <motion.div
        className="github__feed"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-10%' }}
        custom={0.3}
        variants={fadeUp}
      >
        {status === 'loading' && (
          <p className="github__status">Loading recent activity…</p>
        )}
        {status === 'error' && (
          <p className="github__status">
            Couldn't load live activity right now —{' '}
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer">
              view GitHub directly
            </a>
            .
          </p>
        )}
        {status === 'ready' && events.length === 0 && (
          <p className="github__status">No recent public activity.</p>
        )}
        {status === 'ready' &&
          events.map((event) => (
            <a
              key={event.id}
              href={`https://github.com/${event.repo?.name}`}
              target="_blank"
              rel="noreferrer"
              className="github__item"
              data-cursor="View"
            >
              <span className="github__item-text">{formatEvent(event)}</span>
              <span className="github__item-time">{timeAgo(event.created_at)}</span>
            </a>
          ))}
      </motion.div>

      <motion.a
        href={`https://github.com/${USERNAME}`}
        target="_blank"
        rel="noreferrer"
        className="github__profile-link"
        data-cursor="Open"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-10%' }}
        custom={0.4}
        variants={fadeUp}
      >
        View full profile →
      </motion.a>
    </section>
  );
}