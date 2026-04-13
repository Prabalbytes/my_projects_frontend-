import { motion } from "framer-motion";

// ── Update these links ────────────────────────────────────────
const GITHUB_URL   = "https://github.com/Prabalbytes";       // 🔗 replace
const LINKEDIN_URL = "https://www.linkedin.com/in/prabal-das-a89604296";  // 🔗 replace
const EMAIL        = "prabaldas421@gmail.com";

// ── CSS ───────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500&display=swap');

  .ft-footer {
    position: relative; overflow: hidden;
    background: #040912;
    border-top: 1px solid rgba(255,255,255,.06);
    font-family: 'Inter', sans-serif;
    padding: 48px 48px 32px;
  }
  @media (max-width:640px) { .ft-footer { padding: 36px 20px 24px; } }

  .ft-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(96,165,250,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,165,250,.03) 1px, transparent 1px);
    background-size: 44px 44px; pointer-events: none;
  }
  .ft-glow {
    position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 200px;
    background: radial-gradient(ellipse, rgba(96,165,250,.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .ft-inner { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; }

  .ft-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 40px; padding-bottom: 36px;
    border-bottom: 1px solid rgba(255,255,255,.05);
  }
  @media (max-width:640px) { .ft-top { flex-direction: column; gap: 32px; } }

  /* Logo */
  .ft-logo { display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:14px }
  .ft-logo-icon {
    width:32px;height:32px;display:flex;align-items:center;justify-content:center;
    border-radius:8px;background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.18);
    flex-shrink:0;
  }
  .ft-logo-icon svg { width:15px;height:15px;stroke:#60a5fa;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round }
  .ft-logo-text { font-size:16px;font-weight:600;color:#f1f5f9;letter-spacing:-.02em }
  .ft-logo-accent { background:linear-gradient(130deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text }
  .ft-tagline { font-size:13px;color:#334155;max-width:260px;line-height:1.7 }

  /* Socials */
  .ft-socials { display:flex;gap:10px;margin-top:20px }
  .ft-soc {
    width:36px;height:36px;display:flex;align-items:center;justify-content:center;
    border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    text-decoration:none;transition:all .2s;
  }
  .ft-soc:hover { background:rgba(96,165,250,.08);border-color:rgba(96,165,250,.25) }
  .ft-soc svg { width:15px;height:15px;stroke:#64748b;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:stroke .2s }
  .ft-soc:hover svg { stroke:#60a5fa }

  /* Nav cols */
  .ft-cols { display:flex;gap:64px }
  @media (max-width:480px) { .ft-cols { gap:32px } }
  .ft-col-title { font-size:10px;letter-spacing:.14em;color:#3d5a7a;margin-bottom:14px;font-family:'JetBrains Mono',monospace }
  .ft-col-links { display:flex;flex-direction:column;gap:10px }
  .ft-col-link { font-size:13px;color:#64748b;text-decoration:none;transition:color .2s;display:flex;align-items:center;gap:6px }
  .ft-col-link:hover { color:#94a3b8 }
  .ft-col-link svg { width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.6 }

  /* Bottom */
  .ft-bottom { display:flex;justify-content:space-between;align-items:center;padding-top:24px;gap:16px;flex-wrap:wrap }
  .ft-copy { font-size:12px;color:#1e3a5f;font-family:'JetBrains Mono',monospace;letter-spacing:.02em }
  .ft-copy span { color:#334155 }
  .ft-status { display:flex;align-items:center;gap:7px;font-size:11px;color:#334155;font-family:'JetBrains Mono',monospace }
  .ft-status-dot { width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e }
`;

// ── Inline SVG icons ──────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const TerminalIcon = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const NAV_LINKS    = ["Home","About","Skills","Projects","Contact"];
const CONNECT_LINKS = [
  { label: "GitHub",   href: GITHUB_URL,          Icon: GithubIcon },
  { label: "LinkedIn", href: LINKEDIN_URL,         Icon: LinkedinIcon },
  { label: "Email",    href: `mailto:${EMAIL}`,   Icon: MailIcon },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ── Component ─────────────────────────────────────────────────
function Footer() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.footer
        className="ft-footer"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="ft-grid-bg" />
        <div className="ft-glow" />

        <div className="ft-inner">

          {/* ── Top row ── */}
          <div className="ft-top">

            {/* Left — brand */}
            <motion.div variants={fadeUp}>
              <a className="ft-logo" href="#home">
                <div className="ft-logo-icon"><TerminalIcon /></div>
                <span className="ft-logo-text">
                  Prabal<span className="ft-logo-accent">Bytes</span>
                </span>
              </a>
              <p className="ft-tagline">
                Building efficient &amp; scalable software, one commit at a time.
              </p>

              {/* Social icon buttons */}
              <div className="ft-socials">
                {[
                  { href: GITHUB_URL,        Icon: GithubIcon,   label: "GitHub"   },
                  { href: LINKEDIN_URL,      Icon: LinkedinIcon, label: "LinkedIn" },
                  { href: `mailto:${EMAIL}`, Icon: MailIcon,     label: "Email"    },
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    className="ft-soc"
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right — cols */}
            <motion.div className="ft-cols" variants={fadeUp}>

              {/* Navigate */}
              <div>
                <div className="ft-col-title">NAVIGATE</div>
                <div className="ft-col-links">
                  {NAV_LINKS.map((name) => (
                    <a
                      key={name}
                      className="ft-col-link"
                      href={`#${name.toLowerCase()}`}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div>
                <div className="ft-col-title">CONNECT</div>
                <div className="ft-col-links">
                  {CONNECT_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      className="ft-col-link"
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      <Icon />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* ── Bottom row ── */}
          <motion.div className="ft-bottom" variants={fadeUp}>
            <p className="ft-copy">
              © <span>{new Date().getFullYear()} PrabalBytes. All rights reserved.</span>
            </p>
            <div className="ft-status">
              <span className="ft-status-dot" />
              All systems operational
            </div>
          </motion.div>

        </div>
      </motion.footer>
    </>
  );
}

export default Footer;
