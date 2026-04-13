import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500&display=swap');

  @property --ba { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
  @keyframes border-spin { to { --ba: 360deg; } }

  .pr-section {
    position: relative; overflow: hidden;
    padding: 80px 1.5rem 90px;
    border-bottom: 1px solid rgba(255,255,255,.05);
    font-family: 'JetBrains Mono', monospace;
    background: #060d1f;
  }
  .pr-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(96,165,250,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,165,250,.04) 1px, transparent 1px);
    background-size: 44px 44px; pointer-events: none;
  }
  .pr-glow-l { position:absolute;top:-60px;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 68%);border-radius:50%;pointer-events:none }
  .pr-glow-r { position:absolute;bottom:0;right:-60px;width:360px;height:360px;background:radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 68%);border-radius:50%;pointer-events:none }
  .pr-svg { position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible }

  .pr-inner { position:relative;z-index:2;max-width:1100px;margin:0 auto }
  .pr-lbl { font-size:11px;letter-spacing:.14em;color:#60a5fa;margin-bottom:14px }
  .pr-h2 { font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#f1f5f9;margin-bottom:8px }
  .pr-grad { background:linear-gradient(130deg,#60a5fa,#a78bfa 60%,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text }
  .pr-divider { width:48px;height:2px;background:linear-gradient(90deg,#60a5fa,#a78bfa);border-radius:2px;margin:20px 0 44px }

  .pr-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px }

  .card-wrap {
    padding: 1.5px; border-radius: 14px; cursor: default;
    background: rgba(255,255,255,.05);
    transition: background .3s;
  }
  .card-wrap:hover {
    background: conic-gradient(from var(--ba), transparent 80%, #60a5fa 88%, #a78bfa 93%, #f472b6 97%, transparent);
    animation: border-spin 2.8s linear infinite;
  }
  .card-inner {
    background: #080f20; border-radius: 13px;
    padding: 28px; height: 100%;
    display: flex; flex-direction: column; gap: 16px;
  }
  .card-top { display:flex;align-items:flex-start;justify-content:space-between;gap:12px }
  .card-num { font-size:11px;color:#1e3a5f;letter-spacing:.1em }
  .card-status { font-size:10px;padding:3px 10px;border-radius:9999px;background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.2);color:#60a5fa;letter-spacing:.06em }
  .card-title { font-size:1.15rem;font-weight:700;color:#f1f5f9;letter-spacing:-.01em;line-height:1.2 }
  .card-desc { font-family:'Inter',sans-serif;font-size:.9rem;line-height:1.75;color:#64748b;flex:1 }
  .card-desc em { color:#7dd3fc;font-style:normal }
  .card-tags { display:flex;flex-wrap:wrap;gap:7px }
  .pr-tag { font-size:10.5px;padding:4px 11px;border-radius:6px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);color:#64748b }
  .card-links { display:flex;gap:12px;margin-top:4px }
  .link-btn { display:flex;align-items:center;gap:6px;font-size:12px;padding:7px 16px;border-radius:8px;text-decoration:none;transition:all .2s;font-family:'JetBrains Mono',monospace }
  .link-live { background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.25);color:#60a5fa }
  .link-live:hover { background:rgba(96,165,250,.18);border-color:rgba(96,165,250,.5) }
  .link-code { background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#64748b }
  .link-code:hover { border-color:rgba(255,255,255,.2);color:#94a3b8 }
  .card-bar { height:2px;border-radius:2px;margin-top:4px;background:linear-gradient(90deg,transparent,rgba(96,165,250,.15),transparent) }
`;

const PROJECTS = [
  {
    num: "PROJECT_01",
    status: "LIVE",
    title: "Blood Donation Website",
    desc: (
      <>
        A full-stack website  that connects <em>blood donors with patients</em>{" "}
        in emergencies. Built with real-time search, donor registration,
        and request handling — because this kind of tool actually matters.
      </>
    ),
    tags: ["React", "Tailwind", "JavaScript", "API"],
    live: "#",
    code: "#",
  },
  {
    num: "PROJECT_02",
    status: "LIVE",
    title: "Portfolio Website",
    desc: (
      <>
        You're looking at it. Built from scratch to showcase my work with
        a focus on <em>clean UI</em>, smooth animations, and a developer
        aesthetic that feels intentional — not templated.
      </>
    ),
    tags: ["React", "Tailwind", "Framer Motion"],
    live: "#",
    code: "#",
  },
];

// ── Framer Motion variants ────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVar = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ── Main component ────────────────────────────────────────────
function Projects() {
  const sectionRef = useRef(null);
  const svgRef     = useRef(null);
  const cardRefs   = useRef([]);
  cardRefs.current = [];
  const addCard = (el) => { if (el) cardRefs.current.push(el); };

  useEffect(() => {
    const section = sectionRef.current;
    const svg     = svgRef.current;
    if (!section || !svg) return;

    const init = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.setAttribute("height", section.offsetHeight);

      const sRect = section.getBoundingClientRect();
      const pts   = cardRefs.current.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left - sRect.left + r.width / 2, y: r.top - sRect.top + r.height / 2 };
      });

      const ns = "http://www.w3.org/2000/svg";
      const d  = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

      // Dashed path
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(96,165,250,0.12)");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("stroke-dasharray", "4 9");
      path.setAttribute("stroke-linecap", "round");
      svg.appendChild(path);

      // Node dots
      pts.forEach((p) => {
        const c = document.createElementNS(ns, "circle");
        c.setAttribute("cx", p.x); c.setAttribute("cy", p.y);
        c.setAttribute("r", "2.5"); c.setAttribute("fill", "rgba(96,165,250,0.2)");
        svg.appendChild(c);
      });

      const total = path.getTotalLength();
      const speed = total / 360;

      // Pulse ring
      const ring = document.createElementNS(ns, "circle");
      ring.setAttribute("r", "10");
      ring.setAttribute("fill", "rgba(96,165,250,0.08)");
      ring.setAttribute("stroke", "rgba(96,165,250,0.25)");
      ring.setAttribute("stroke-width", "1");
      svg.appendChild(ring);

      // Traveling dot
      const dot = document.createElementNS(ns, "circle");
      dot.setAttribute("r", "4"); dot.setAttribute("fill", "#60a5fa");
      dot.style.filter = "drop-shadow(0 0 6px #60a5fa) drop-shadow(0 0 12px #a78bfa)";
      svg.appendChild(dot);

      let prog = 0, rafId;
      const animate = () => {
        prog = (prog + speed) % total;
        const pt = path.getPointAtLength(prog);
        dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
        ring.setAttribute("cx", pt.x); ring.setAttribute("cy", pt.y);
        rafId = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(rafId);
    };

    const t = setTimeout(init, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="projects" className="pr-section" ref={sectionRef}>
        <div className="pr-grid-bg" />
        <div className="pr-glow-l" />
        <div className="pr-glow-r" />
        <svg className="pr-svg" ref={svgRef} />

        <div className="pr-inner">

          {/* ── Header ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="pr-lbl" variants={fadeUp}>
              // projects.showcase
            </motion.div>
            <motion.h2 className="pr-h2" variants={fadeUp}>
              Featured <span className="pr-grad">Projects</span>
            </motion.h2>
            <motion.div className="pr-divider" variants={fadeUp} />
          </motion.div>

          {/* ── Cards ── */}
          <motion.div
            className="pr-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.num}
                variants={cardVar}
                ref={addCard}
                className="card-wrap"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className="card-inner">

                  <div className="card-top">
                    <span className="card-num">{p.num}</span>
                    <span className="card-status">● {p.status}</span>
                  </div>

                  <div className="card-title">{p.title}</div>

                  <p className="card-desc">{p.desc}</p>

                  <div className="card-tags">
                    {p.tags.map((t) => (
                      <span className="pr-tag" key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="card-links">
                    <a href={p.live} className="link-btn link-live">↗ Live</a>
                    <a href={p.code} className="link-btn link-code">⌥ Code</a>
                  </div>

                  <div className="card-bar" />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Projects;
