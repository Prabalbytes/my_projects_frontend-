const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

  @keyframes fadeslide {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @property --ba { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
  @keyframes border-spin { to { --ba: 360deg; } }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes bar-fill { from { width: 0%; } to { width: var(--w); } }

  .about-section {
    position: relative; overflow: hidden;
    padding: 90px 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-family: 'JetBrains Mono', monospace;
    background: #060d1f;
  }
  .about-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px);
    background-size: 44px 44px; pointer-events: none;
  }
  .about-glow-l {
    position: absolute; top: -60px; left: -80px;
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 68%);
    border-radius: 50%; pointer-events: none;
  }
  .about-glow-r {
    position: absolute; bottom: 0; right: -60px;
    width: 340px; height: 340px;
    background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 68%);
    border-radius: 50%; pointer-events: none;
  }
  .about-inner {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: start;
  }
  @media (max-width: 768px) {
    .about-inner { grid-template-columns: 1fr; gap: 40px; }
  }
  .about-label {
    font-size: 11px; letter-spacing: 0.14em; color: #60a5fa;
    margin-bottom: 14px;
    animation: fadeslide 0.6s ease 0.1s both;
  }
  .about-h2 {
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
    color: #f1f5f9; margin-bottom: 8px;
    animation: fadeslide 0.6s ease 0.2s both;
  }
  .about-grad {
    background: linear-gradient(130deg, #60a5fa, #a78bfa 60%, #f472b6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .about-divider {
    width: 48px; height: 2px;
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    border-radius: 2px; margin: 20px 0 24px;
    animation: fadeslide 0.6s ease 0.3s both;
  }
  .about-bio {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem; line-height: 1.85; color: #64748b;
    margin-bottom: 20px;
    animation: fadeslide 0.6s ease 0.35s both;
  }
  .about-bio em { color: #7dd3fc; font-style: normal; }
  .about-bio2 {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem; line-height: 1.85; color: #64748b;
    margin-bottom: 32px;
    animation: fadeslide 0.6s ease 0.42s both;
  }
  .about-bio2 em { color: #c4b5fd; font-style: normal; }
  .about-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 12px; margin-bottom: 32px;
    animation: fadeslide 0.6s ease 0.5s both;
  }
  .about-stat-card {
    background: rgba(96,165,250,0.05);
    border: 1px solid rgba(96,165,250,0.12);
    border-radius: 10px; padding: 14px 12px; text-align: center;
  }
  .about-stat-num {
    font-size: 1.6rem; font-weight: 700;
    background: linear-gradient(130deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .about-stat-lbl { font-size: 10px; color: #475569; letter-spacing: 0.08em; margin-top: 4px; }
  .about-tags {
    display: flex; flex-wrap: wrap; gap: 8px;
    animation: fadeslide 0.6s ease 0.58s both;
  }
  .about-tag {
    font-size: 11.5px; padding: 5px 13px;
    border-radius: 6px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: #94a3b8; cursor: default;
    transition: border-color 0.2s, color 0.2s;
  }
  .about-tag:hover { border-color: rgba(96,165,250,0.35); color: #7dd3fc; }

  /* Terminal */
  .term-wrap {
    padding: 1.5px; border-radius: 14px;
    background: conic-gradient(from var(--ba), transparent 80%, #60a5fa 88%, #a78bfa 93%, #f472b6 97%, transparent);
    animation: fadeslide 0.6s ease 0.3s both, border-spin 3.5s linear infinite;
  }
  .terminal { background: #080f20; border-radius: 13px; overflow: hidden; }
  .term-bar {
    background: #0d1830; padding: 11px 16px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .term-dot-r { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
  .term-dot-y { width: 11px; height: 11px; border-radius: 50%; background: #ffbd2e; }
  .term-dot-g { width: 11px; height: 11px; border-radius: 50%; background: #28c840; }
  .term-title { font-size: 11px; color: #3d5070; margin-left: 8px; letter-spacing: 0.06em; }
  .term-body { padding: 20px; }
  .tline { margin-bottom: 16px; }
  .t-prompt { color: #3d5a7a; font-size: 12px; }
  .t-cmd { color: #60a5fa; font-size: 12px; }
  .t-out { color: #64748b; font-size: 12px; margin-top: 4px; padding-left: 12px; }
  .t-val { color: #a78bfa; }
  .t-str { color: #86efac; }
  .t-num { color: #f472b6; }
  .skill-label { font-size: 11px; color: #3d5a7a; margin-bottom: 10px; }
  .skill-row { margin-bottom: 10px; }
  .skill-name {
    font-size: 11px; color: #94a3b8; margin-bottom: 5px;
    display: flex; justify-content: space-between;
  }
  .skill-name span { color: #60a5fa; }
  .skill-bar-bg { height: 4px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
  .skill-bar {
    height: 100%; border-radius: 4px;
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    width: 0%; animation: bar-fill 1.2s ease var(--d) forwards;
  }
  .t-cursor {
    display: inline-block; width: 7px; height: 13px;
    background: #60a5fa; border-radius: 1px; margin-left: 2px;
    vertical-align: middle; animation: blink 1s step-end infinite;
  }
`;

const TAGS = [
  "Digital Logic", "OOP", "DBMS",
  "COA", "DSA", "ML",
  "OS", "Computer Networks",
];


function About() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="about" className="about-section">

        <div className="about-grid-bg" />
        <div className="about-glow-l" />
        <div className="about-glow-r" />

        <div className="about-inner">

          {/* ── LEFT ── */}
          <div>
            <div className="about-label">// about_me.md</div>

            <h2 className="about-h2">
              Crafting Code,<br />
              <span className="about-grad">Solving Problems.</span>
            </h2>

            <div className="about-divider" />

            <p className="about-bio">
               I'm a <em>software developer</em> who loves turning ideas into 
              real, working products. I care about writing clean code that 
               actually makes sense to read — not just code that runs.
            </p>
            <p className="about-bio2">
                I'm currently in my final year of CSE, building projects, learning 
                <em> system design</em>, and getting better every day. I believe 
                curiosity beats credentials — and I bring that energy to everything I build.
              </p>

            <div className="about-stats">
              {[["2+", "PROJECTS"], ["Fresher", "EXPERIENCE"], ["99%", "COFFEE ☕"]].map(([n, l]) => (
                <div className="about-stat-card" key={l}>
                  <div className="about-stat-num">{n}</div>
                  <div className="about-stat-lbl">{l}</div>
                </div>
              ))}
            </div>

            <div className="about-tags">
              {TAGS.map((t) => <span className="about-tag" key={t}>{t}</span>)}
            </div>
          </div>

          {/* ── RIGHT — Terminal ── */}
          <div className="term-wrap">
            <div className="terminal">
              <div className="term-bar">
                <div className="term-dot-r" />
                <div className="term-dot-y" />
                <div className="term-dot-g" />
                <span className="term-title">prabal@portfolio ~ zsh</span>
              </div>

              <div className="term-body">

                <div className="tline">
                  <div><span className="t-prompt">➜ ~ </span><span className="t-cmd">cat profile.json</span></div>
                  <div className="t-out">{"{"}</div>
                    <div className="t-out">&nbsp;&nbsp;<span className="t-str">"role"</span>: <span className="t-val">"CS Student & Developer"</span>,</div>
                    <div className="t-out">&nbsp;&nbsp;<span className="t-str">"status"</span>: <span className="t-val">"Fresher, open to work"</span>,</div>
                    <div className="t-out">&nbsp;&nbsp;<span className="t-str">"degree"</span>: <span className="t-val">"B.Tech CSE"</span>,</div>
                  <div className="t-out">{"}"}</div>
                </div>

                <div className="tline">
                  <div><span className="t-prompt">➜ ~ </span><span className="t-cmd">./interests --list</span></div>
                  {["Distributed Systems", "API Design & Performance", "Open Source", "Developer Tooling"].map(i => (
                    <div className="t-out" key={i}>› <span className="t-val">{i}</span></div>
                  ))}
                </div>

                

                <div style={{ marginTop: "18px" }}>
                  <span className="t-prompt">➜ ~ </span>
                  <span className="t-cursor" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default About;
