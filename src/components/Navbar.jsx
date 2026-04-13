import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Nav links — human readable, no ./ prefix ─────────────────
const NAV_LINKS = [
  { name: "Home",     href: "#home"     },
  { name: "About",    href: "#about"    },
  { name: "Skills",   href: "#skills"   },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact"  },
];

// ── CSS ───────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;500;600&display=swap');

  @property --ba { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
  @keyframes border-spin { to { --ba: 360deg; } }

  .nb-nav {
    position: fixed; top: 0; z-index: 50; width: 100%;
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 48px; height: 64px;
    background: rgba(6,13,31,0.75);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    font-family: 'Inter', sans-serif;
  }
  @media (max-width: 768px) { .nb-nav { padding: 0 20px; } }

  /* Logo */
  .nb-logo { display:flex;align-items:center;gap:10px;text-decoration:none }
  .nb-logo-icon {
    width:34px;height:34px;display:flex;align-items:center;justify-content:center;
    border-radius:9px;background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.2);
    flex-shrink:0;transition:background .25s,border-color .25s;
  }
  .nb-logo:hover .nb-logo-icon { background:rgba(96,165,250,.18);border-color:rgba(96,165,250,.4) }
  .nb-logo-icon svg { width:16px;height:16px;stroke:#60a5fa;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round }
  .nb-logo-text { font-size:17px;font-weight:600;color:#f1f5f9;letter-spacing:-.02em }
  .nb-logo-accent { background:linear-gradient(130deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text }

  /* Desktop links */
  .nb-links { display:flex;align-items:center;gap:2px }
  @media (max-width:768px) { .nb-links { display:none } }

  .nb-link {
    position:relative;padding:8px 16px;border-radius:8px;
    font-size:14px;font-weight:500;color:#64748b;
    text-decoration:none;transition:color .2s,background .2s;cursor:pointer;
  }
  .nb-link:hover { color:#e2e8f0;background:rgba(255,255,255,.04) }
  .nb-link.nb-active { color:#f1f5f9 }

  /* CTA */
  .nb-cta-wrap {
    padding:1.5px;border-radius:10px;
    background:conic-gradient(from var(--ba),transparent 80%,#60a5fa 88%,#a78bfa 93%,#f472b6 97%,transparent);
    animation:border-spin 3s linear infinite;
  }
  @media (max-width:768px) { .nb-cta-wrap { display:none } }
  .nb-cta {
    display:flex;align-items:center;gap:8px;
    padding:8px 18px;border-radius:9px;
    background:#080f20;color:#cbd5e1;
    font-size:13px;font-weight:500;
    text-decoration:none;transition:background .2s,color .2s;white-space:nowrap;
  }
  .nb-cta:hover { background:#111f38;color:#f1f5f9 }
  .nb-cta-dot {
    width:6px;height:6px;border-radius:50%;
    background:#22c55e;box-shadow:0 0 6px #22c55e;flex-shrink:0;
  }

  /* Mobile menu button */
  .nb-hamburger {
    display:none;flex-direction:column;gap:5px;padding:6px;
    background:none;border:none;cursor:pointer;
  }
  @media (max-width:768px) { .nb-hamburger { display:flex } }
  .nb-hamburger span {
    display:block;width:22px;height:1.5px;border-radius:2px;
    background:#64748b;transition:all .3s;
  }
  .nb-hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg) }
  .nb-hamburger.open span:nth-child(2) { opacity:0 }
  .nb-hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg) }

  /* Mobile drawer */
  .nb-drawer {
    position:fixed;top:64px;left:0;right:0;
    background:rgba(6,13,31,.96);backdrop-filter:blur(20px);
    border-bottom:1px solid rgba(255,255,255,.06);
    padding:16px 20px 20px;z-index:49;
    display:flex;flex-direction:column;gap:4px;
  }
  .nb-drawer-link {
    padding:12px 16px;border-radius:8px;
    font-size:15px;font-weight:500;color:#64748b;
    text-decoration:none;transition:color .2s,background .2s;
  }
  .nb-drawer-link:hover,.nb-drawer-link.nb-active { color:#f1f5f9;background:rgba(255,255,255,.05) }
  .nb-drawer-cta {
    margin-top:8px;padding:12px 16px;border-radius:8px;
    font-size:14px;font-weight:500;color:#60a5fa;
    text-decoration:none;border:1px solid rgba(96,165,250,.2);
    background:rgba(96,165,250,.06);text-align:center;
    transition:background .2s;
  }
  .nb-drawer-cta:hover { background:rgba(96,165,250,.12) }
`;

// ── Component ─────────────────────────────────────────────────
function Navbar() {
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Track scroll for shadow + active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Highlight active section based on scroll position
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href.replace("#", ""));
    setMenuOpen(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <motion.nav
        className="nb-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* ── Logo ── */}
        <a className="nb-logo" href="#home" onClick={() => handleNav("#home")}>
          <div className="nb-logo-icon">
            <svg viewBox="0 0 24 24">
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </div>
          <span className="nb-logo-text">
            Prabal<span className="nb-logo-accent">Bytes</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <ul className="nb-links" style={{ listStyle: "none" }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: "easeOut" }}
              >
                <a
                  href={link.href}
                  className={`nb-link${isActive ? " nb-active" : ""}`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.name}

                  {/* Animated underline via Framer Motion */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute", bottom: 6, left: 16, right: 16,
                        height: 2, borderRadius: 2,
                        background: "linear-gradient(90deg,#60a5fa,#a78bfa)",
                        display: "block",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </ul>

        {/* ── CTA ── */}
        <motion.div
          className="nb-cta-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <a className="nb-cta" href="#contact" onClick={() => handleNav("#contact")}>
            <span className="nb-cta-dot" />
            Get in touch
          </a>
        </motion.div>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`nb-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nb-drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nb-drawer-link${active === link.href.replace("#","") ? " nb-active" : ""}`}
                onClick={() => handleNav(link.href)}
              >
                {link.name}
              </a>
            ))}
            <a className="nb-drawer-cta" href="#contact" onClick={() => handleNav("#contact")}>
              Get in touch →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
