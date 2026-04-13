import { useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
  @keyframes sk-fadeslide { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

  .skills-section { position:relative;overflow:hidden;padding:80px 1.5rem 100px;border-bottom:1px solid rgba(255,255,255,0.05);background:#060d1f;font-family:'JetBrains Mono',monospace; }
  .sk-grid-bg { position:absolute;inset:0;background-image:linear-gradient(rgba(96,165,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.04) 1px,transparent 1px);background-size:44px 44px;pointer-events:none; }
  .sk-glow-tl { position:absolute;top:-80px;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 68%);border-radius:50%;pointer-events:none; }
  .sk-glow-br { position:absolute;bottom:-80px;right:-80px;width:360px;height:360px;background:radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 68%);border-radius:50%;pointer-events:none; }
  .sk-wrap { position:relative;z-index:2;max-width:1100px;margin:0 auto; }
  .sk-label { font-size:11px;letter-spacing:.14em;color:#60a5fa;margin-bottom:12px; }
  .sk-h2 { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;letter-spacing:-.02em;color:#f1f5f9;line-height:1.1;margin-bottom:8px; }
  .sk-grad { background:linear-gradient(130deg,#60a5fa,#a78bfa 60%,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
  .sk-div { width:48px;height:2px;background:linear-gradient(90deg,#60a5fa,#a78bfa);border-radius:2px;margin:18px 0 38px; }
  .sk-root { position:relative; }
  .sk-group { margin-bottom:32px; }
  .sk-grp-lbl { font-size:11px;color:#3d5a7a;letter-spacing:.1em;margin-bottom:14px;display:flex;align-items:center;gap:10px; }
  .sk-grp-lbl::after { content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(96,165,250,0.15),transparent); }
  .sk-cards { display:flex;flex-wrap:wrap;gap:12px; }
  .sk-card { position:relative;background:rgba(8,15,32,0.9);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 14px 13px;display:flex;flex-direction:column;align-items:center;gap:9px;cursor:default;width:118px;transition:border-color .35s,box-shadow .35s,transform .2s; }
  .sk-card:hover { transform:translateY(-3px); }
  .sk-card.active { border-color:var(--c)!important;box-shadow:0 0 18px var(--g),0 0 36px var(--g2);transform:translateY(-3px); }
  .sk-icon { width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--ibg); }
  .sk-name { font-size:11px;font-weight:500;color:#94a3b8;text-align:center; }
  .sk-svg { position:absolute;top:0;left:0;pointer-events:none;overflow:visible;z-index:1; }
`;

const GROUPS = [
  { lbl: '{ programming }', skills: [
    { n: 'C++',        c: '#60a5fa', g: 'rgba(96,165,250,.28)',  g2: 'rgba(96,165,250,.08)',  ib: 'rgba(96,165,250,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><text x="16" y="22" fontFamily="JetBrains Mono" fontWeight="700" fontSize="13" fill="#60a5fa" textAnchor="middle">C++</text></svg>) },
    { n: 'Python',     c: '#FFD43B', g: 'rgba(255,212,59,.28)',  g2: 'rgba(255,212,59,.08)',  ib: 'rgba(255,212,59,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><path d="M16 2c-5.5 0-5 2.5-5 2.5v2.5h10V8H9S5 7.8 5 14s4 5 4 5h2v-2.5S10.8 14 13 14h6s3 .2 3-2.5V6s.5-4-6-4zm-1.5 2.5a1 1 0 110-2 1 1 0 010 2z" fill="#3776AB"/><path d="M16 30c5.5 0 5-2.5 5-2.5v-2.5H11V24h12s4 .2 4-6-4-5-4-5h-2v2.5S21.2 18 19 18h-6s-3-.2-3 2.5v6s-.5 4 6 4zm1.5-2.5a1 1 0 110 2 1 1 0 010-2z" fill="#FFD43B"/></svg>) },
    { n: 'Java',       c: '#ED8B00', g: 'rgba(237,139,0,.28)',   g2: 'rgba(237,139,0,.08)',   ib: 'rgba(237,139,0,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><path d="M20.5 22.5s1.5-.9-1-1.2c-3.5-.4-4.2-.3-7.5.3 0 0-.8-.5-2-1 7-3 15.5.2 10.5 1.9zM19 19.5s1.7-1-.8-1.3c-3.2-.3-5.7-.3-10.5.4 0 0-.5-.6-1.5-.8 9.3-2.7 19.5-.2 12.8 1.7z" fill="#ED8B00"/><path d="M14 4.5S11.2 7.8 17 12c4.3 2.8 1 5.5-1 7.5 3-2.8 5.5-5.2 4-7.5C18.5 9.7 13 7.8 14 4.5z" fill="#F89820"/></svg>) },
  ]},
  { lbl: '{ web }', skills: [
    { n: 'HTML',       c: '#E34F26', g: 'rgba(227,79,38,.28)',   g2: 'rgba(227,79,38,.08)',   ib: 'rgba(227,79,38,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><path d="M5 3l2.2 24.5L16 30l8.8-2.5L27 3H5zm16.2 7H10.5l.2 2.5h10.2l-.8 8.8-4.1 1.1-4.1-1.1-.3-3h2.7l.1 1.5 1.6.4 1.6-.4.3-2.8H10.2L9.5 10h11.7z" fill="#E34F26"/></svg>) },
    { n: 'CSS',        c: '#264de4', g: 'rgba(38,77,228,.28)',   g2: 'rgba(38,77,228,.08)',   ib: 'rgba(38,77,228,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><path d="M5 3l2.2 24.5L16 30l8.8-2.5L27 3H5zm15.8 7l-.5 5.3-4.3 1.2-4.3-1.2-.3-3h2.7l.1 1.5 1.8.5 1.8-.5.2-2.8H9.8L9.5 10h11.3z" fill="#264de4"/></svg>) },
    { n: 'Tailwind',   c: '#06B6D4', g: 'rgba(6,182,212,.28)',  g2: 'rgba(6,182,212,.08)',   ib: 'rgba(6,182,212,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><path d="M16 7c-4 0-6.5 2-7.5 6 1.5-2 3.3-2.8 5.3-2.3 1.1.3 1.9 1.1 2.8 2 1.5 1.5 3.2 3.3 6.9 3.3 4 0 6.5-2 7.5-6-1.5 2-3.3 2.8-5.3 2.3-1.1-.3-1.9-1.1-2.8-2C21.4 8.8 19.7 7 16 7zM8.5 16c-4 0-6.5 2-7.5 6 1.5-2 3.3-2.8 5.3-2.3 1.1.3 1.9 1.1 2.8 2 1.5 1.5 3.2 3.3 6.9 3.3 4 0 6.5-2 7.5-6-1.5 2-3.3 2.8-5.3 2.3-1.1-.3-1.9-1.1-2.8-2-1.5-1.5-3.2-3.3-6.9-3.3z" fill="#06B6D4"/></svg>) },
    { n: 'JavaScript', c: '#F7DF1E', g: 'rgba(247,223,30,.28)', g2: 'rgba(247,223,30,.08)',  ib: 'rgba(247,223,30,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><rect x="3" y="3" width="26" height="26" rx="3" fill="none" stroke="#F7DF1E" strokeWidth="1.5"/><text x="16" y="23" fontFamily="JetBrains Mono" fontWeight="700" fontSize="12" fill="#F7DF1E" textAnchor="middle">JS</text></svg>) },
    { n: 'React',      c: '#61DAFB', g: 'rgba(97,218,251,.28)', g2: 'rgba(97,218,251,.08)',  ib: 'rgba(97,218,251,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><g transform="translate(16,16)" fill="none" stroke="#61DAFB" strokeWidth="1.3"><ellipse rx="12" ry="4.5"/><ellipse rx="12" ry="4.5" transform="rotate(60)"/><ellipse rx="12" ry="4.5" transform="rotate(120)"/><circle r="2.5" fill="#61DAFB" stroke="none"/></g></svg>) },
  ]},
  { lbl: '{ tools }', skills: [
    { n: 'Git',        c: '#F05032', g: 'rgba(240,80,50,.28)',   g2: 'rgba(240,80,50,.08)',   ib: 'rgba(240,80,50,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><circle cx="7" cy="7" r="3" fill="none" stroke="#F05032" strokeWidth="1.5"/><circle cx="7" cy="25" r="3" fill="none" stroke="#F05032" strokeWidth="1.5"/><circle cx="25" cy="14" r="3" fill="none" stroke="#F05032" strokeWidth="1.5"/><path d="M7 10v12" stroke="#F05032" strokeWidth="1.5"/><path d="M7 11 C7 18 25 17 25 14" stroke="#F05032" strokeWidth="1.5" fill="none"/></svg>) },
    { n: 'GitHub',     c: '#E6EDF3', g: 'rgba(230,237,243,.2)', g2: 'rgba(230,237,243,.05)', ib: 'rgba(230,237,243,.06)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><path d="M16 3C8.7 3 3 8.7 3 16c0 5.7 3.7 10.6 8.9 12.3.6.1.9-.3.9-.6v-2.3c-3.5.8-4.3-1.7-4.3-1.7-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.8-.3-5.7-1.4-5.7-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.4 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.6 3.5-1.3 3.5-1.3.7 1.8.3 3.1.1 3.4.8.9 1.3 2 1.3 3.4 0 4.8-2.9 5.9-5.7 6.2.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.9.6C25.3 26.6 29 21.7 29 16c0-7.3-5.7-13-13-13z" fill="#E6EDF3"/></svg>) },
  ]},
  { lbl: '{ libraries }', skills: [
    { n: 'NumPy',      c: '#4DABCF', g: 'rgba(77,171,207,.28)', g2: 'rgba(77,171,207,.08)',  ib: 'rgba(77,171,207,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><text x="16" y="21" fontFamily="JetBrains Mono" fontWeight="700" fontSize="14" fill="#4DABCF" textAnchor="middle">np</text><rect x="5" y="25" width="22" height="1.5" rx="1" fill="#4DABCF" opacity=".4"/></svg>) },
    { n: 'Pandas',     c: '#E70488', g: 'rgba(231,4,136,.28)',  g2: 'rgba(231,4,136,.08)',   ib: 'rgba(231,4,136,.1)',
      ic: (<svg viewBox="0 0 32 32" width="26" height="26"><text x="16" y="21" fontFamily="JetBrains Mono" fontWeight="700" fontSize="14" fill="#E70488" textAnchor="middle">pd</text><rect x="5" y="25" width="22" height="1.5" rx="1" fill="#E70488" opacity=".4"/></svg>) },
  ]},
];

function buildPath(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const mx = (p.x + c.x) / 2;
    d += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`;
  }
  return d;
}

function svgNS(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }

export default function Skills() {
  const rootRef = useRef(null);
  const svgRef  = useRef(null);

  useEffect(() => {
    let raf;
    const timer = setTimeout(() => {
      const root = rootRef.current;
      const svg  = svgRef.current;
      if (!root || !svg) return;

      const cards = Array.from(root.querySelectorAll('.sk-card'));
      const rr = root.getBoundingClientRect();
      const pts = cards.map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.left - rr.left + r.width / 2, y: r.top - rr.top + r.height / 2 };
      });

      svg.setAttribute('width',  root.offsetWidth);
      svg.setAttribute('height', root.offsetHeight);

      const d = buildPath(pts);

      // Defs
      const defs = svgNS('defs');
      defs.innerHTML = `
        <linearGradient id="sk-lg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#60a5fa" stop-opacity="0"/>
          <stop offset="40%"  stop-color="#60a5fa"/>
          <stop offset="60%"  stop-color="#a78bfa"/>
          <stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>
        </linearGradient>
        <filter id="sk-gf" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>`;
      svg.appendChild(defs);

      // Static dashed line
      const dash = svgNS('path');
      dash.setAttribute('d', d); dash.setAttribute('fill', 'none');
      dash.setAttribute('stroke', 'rgba(96,165,250,0.1)'); dash.setAttribute('stroke-width', '1.5');
      dash.setAttribute('stroke-dasharray', '5 8');
      svg.appendChild(dash);

      // Moving glow segment
      const mpath = svgNS('path');
      mpath.setAttribute('d', d); mpath.setAttribute('fill', 'none');
      mpath.setAttribute('stroke', 'url(#sk-lg)'); mpath.setAttribute('stroke-width', '2');
      const TL = dash.getTotalLength();
      const SEG = TL * 0.1;
      mpath.setAttribute('stroke-dasharray', `${SEG} ${TL}`);
      svg.appendChild(mpath);

      // Dot
      const dot = svgNS('circle');
      dot.setAttribute('r', '5'); dot.setAttribute('fill', '#a78bfa');
      dot.setAttribute('filter', 'url(#sk-gf)');
      svg.appendChild(dot);

      // Measure cumulative lengths to each card
      const msvg = svgNS('svg');
      msvg.style.cssText = 'position:absolute;left:-9999px;visibility:hidden';
      document.body.appendChild(msvg);
      const cardLens = [0];
      for (let i = 1; i < pts.length; i++) {
        const mp = svgNS('path');
        mp.setAttribute('d', buildPath(pts.slice(0, i + 1)));
        msvg.appendChild(mp);
        cardLens.push(mp.getTotalLength());
      }
      document.body.removeChild(msvg);

      let t0 = null, prev = -1;
      const DUR = 10000;

      function tick(ts) {
        if (!t0) t0 = ts;
        const prog = ((ts - t0) % DUR) / DUR;
        const head = prog * TL;
        mpath.setAttribute('stroke-dashoffset', (-(head - SEG)).toString());
        const pt = dash.getPointAtLength(Math.min(head, TL - 1));
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);

        let ai = 0;
        for (let i = cardLens.length - 1; i >= 0; i--) {
          if (head >= cardLens[i] - TL * 0.04) { ai = i; break; }
        }
        if (ai !== prev) {
          if (prev >= 0) cards[prev].classList.remove('active');
          cards[ai].classList.add('active');
          prev = ai;
        }
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }, 250);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="skills" className="skills-section">
        <div className="sk-grid-bg" />
        <div className="sk-glow-tl" />
        <div className="sk-glow-br" />

        <div className="sk-wrap">
          <div className="sk-label">// skills.config</div>
          <h2 className="sk-h2">Technical <span className="sk-grad">Arsenal</span></h2>
          <div className="sk-div" />

          <div className="sk-root" ref={rootRef}>
            <svg className="sk-svg" ref={svgRef} />

            {GROUPS.map((g, gi) => (
              <div className="sk-group" key={g.lbl}>
                <div className="sk-grp-lbl">{g.lbl}</div>
                <div className="sk-cards">
                  {g.skills.map((s, si) => (
                    <div
                      key={s.n}
                      className="sk-card"
                      style={{
                        '--c': s.c, '--g': s.g, '--g2': s.g2, '--ibg': s.ib,
                        animation: `sk-fadeslide .5s ease ${(gi * .12 + si * .07).toFixed(2)}s both`,
                      }}
                    >
                      <div className="sk-icon">{s.ic}</div>
                      <div className="sk-name">{s.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
