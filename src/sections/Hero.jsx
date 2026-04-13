import { useState, ArrowRight } from "react";

const lucideArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ICONS = [
  "{}", "</>", "//", "npm", "git", "fn()",
  "=>", "&&", "||", "[]", "API", "ssh",
  "#!", "def", "var", "pkg", "tsx", "env",
  "404", "200", "$_", ">>", "/**/", "::",
];

function rand(min, max) { return Math.random() * (max - min) + min; }

const FALLING = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  icon: ICONS[i % ICONS.length],
  left: `${rand(2, 97)}%`,
  duration: rand(9, 18),
  delay: rand(0, 14),
  opacity: rand(0.08, 0.28),
  size: rand(11, 16),
}));

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, html { background: #060d1f; }

  @keyframes fall {
    0%   { transform: translateY(-60px) rotate(-5deg); opacity: 0; }
    8%   { opacity: var(--op); }
    88%  { opacity: var(--op); }
    100% { transform: translateY(102vh) rotate(10deg); opacity: 0; }
  }

  @keyframes fadeslide {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(96,165,250,0.5); }
    50%       { box-shadow: 0 0 0 6px rgba(96,165,250,0); }
  }

  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @property --ba {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes border-spin {
    to { --ba: 360deg; }
  }

  .hero-section {
    position: relative;
    overflow: hidden;
    min-height: 88vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 1.5rem;
    background: #060d1f;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }

  .glow-1 {
    position: absolute; top: -120px; left: -120px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .glow-2 {
    position: absolute; bottom: -80px; right: -80px;
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .falling-icon {
    position: absolute;
    font-family: 'JetBrains Mono', monospace;
    user-select: none;
    pointer-events: none;
    animation: fall var(--dur) linear var(--delay) infinite;
    color: rgba(96,165,250, var(--op));
    top: -50px;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(96,165,250,0.07);
    border: 1px solid rgba(96,165,250,0.2);
    border-radius: 9999px;
    padding: 5px 18px;
    margin-bottom: 28px;
    font-size: 12px; color: #60a5fa; letter-spacing: 0.05em;
    animation: fadeslide 0.7s ease 0.1s both;
  }
  .badge-dot {
    width: 7px; height: 7px;
    background: #60a5fa;
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  h1 {
    font-size: clamp(2.4rem, 7vw, 4.6rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: #f1f5f9;
    margin-bottom: 22px;
    animation: fadeslide 0.7s ease 0.25s both;
  }
  .name-grad {
    background: linear-gradient(130deg, #60a5fa 0%, #a78bfa 55%, #f472b6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cursor-blink {
    display: inline-block;
    width: 3px; height: 0.85em;
    background: #60a5fa;
    border-radius: 2px;
    vertical-align: middle;
    margin-left: 6px;
    animation: cursor-blink 1s step-end infinite;
  }

  .tagline {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    color: #64748b;
    max-width: 540px;
    line-height: 1.75;
    margin-bottom: 42px;
    animation: fadeslide 0.7s ease 0.42s both;
  }
  .tagline em { color: #7dd3fc; font-style: normal; }

  .btn-row {
    display: flex; gap: 14px;
    flex-wrap: wrap; justify-content: center;
    animation: fadeslide 0.7s ease 0.58s both;
  }

  /* Moving border button via conic-gradient trick */
  .btn-ghost-wrap {
    padding: 1.5px;
    border-radius: 11px;
    background: conic-gradient(from var(--ba), transparent 82%, #60a5fa 90%, #a78bfa 94%, #f472b6 97%, transparent);
    animation: border-spin 2.8s linear infinite;
    cursor: pointer;
  }
  .btn-ghost-inner {
    display: flex; align-items: center; gap: 9px;
    padding: 11px 24px;
    border-radius: 10px;
    background: #0c1526;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px; font-weight: 500;
    border: none; outline: none; cursor: pointer;
    transition: background 0.2s;
  }
  .btn-ghost-inner:hover { background: #111f36; }
  .btn-ghost-inner svg { color: #60a5fa; }

  .btn-solid-wrap {
    padding: 1.5px;
    border-radius: 11px;
    background: conic-gradient(from var(--ba), transparent 82%, #a78bfa 90%, #f472b6 96%, transparent);
    animation: border-spin 2.8s linear infinite;
    animation-delay: -1.4s;
    cursor: pointer;
  }
  .btn-solid-inner {
    display: flex; align-items: center; gap: 9px;
    padding: 11px 24px;
    border-radius: 10px;
    background: #0c1526;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px; font-weight: 500;
    border: none; outline: none; cursor: pointer;
    transition: background 0.2s;
  }
  .btn-solid-inner:hover { background: #111f36; }

  .scroll-hint {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: #334155;
    font-size: 11px; letter-spacing: 0.1em;
    animation: fadeslide 1s ease 1s both;
  }
  .scroll-line {
    width: 1px; height: 36px;
    background: linear-gradient(to bottom, #60a5fa44, transparent);
  }
`;

export default function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="hero-section">

        <div className="glow-1" />
        <div className="glow-2" />
        <div className="grid-bg" />

        {FALLING.map((ic) => (
          <span
            key={ic.id}
            className="falling-icon"
            style={{
              left: ic.left,
              fontSize: `${ic.size}px`,
              "--dur": `${ic.duration}s`,
              "--delay": `${ic.delay}s`,
              "--op": ic.opacity,
            }}
          >
            {ic.icon}
          </span>
        ))}

        <div className="content">
          <div className="badge">
            <span className="badge-dot" />
            available for_work
          </div>

          <h1>
            Hi, I'm{" "}
            <span className="name-grad">Prabal</span>
            <span className="cursor-blink" />
          </h1>

          <p className="tagline">
            I build <em>efficient &amp; scalable</em> software solutions —
            focusing on <em> system design, performance, and reliability.</em>
          </p>

          <div className="btn-row">
            <div className="btn-ghost-wrap">
                 <button
                  className="btn-ghost-inner"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                view_projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

            <div className="btn-solid-wrap">
             <button
                 className="btn-solid-inner"
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               >
                 contact_me
                </button>
              </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          SCROLL
        </div>

      </section>
    </>
  );
}
