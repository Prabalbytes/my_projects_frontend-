import { useState } from "react";
import { motion } from "framer-motion";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500&display=swap');

  @property --ba { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
  @keyframes border-spin  { to { --ba: 360deg; } }
  @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }

  .ct-section {
    position: relative; overflow: hidden;
    padding: 80px 1.5rem 90px;
    border-bottom: 1px solid rgba(255,255,255,.05);
    font-family: 'JetBrains Mono', monospace;
    background: transparent;
  }
  .ct-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(96,165,250,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,165,250,.04) 1px, transparent 1px);
    background-size: 44px 44px; pointer-events: none;
  }
  .ct-glow-l { position:absolute;top:-60px;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 68%);border-radius:50%;pointer-events:none }
  .ct-glow-r { position:absolute;bottom:0;right:-60px;width:360px;height:360px;background:radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 68%);border-radius:50%;pointer-events:none }

  .ct-inner {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 72px; align-items: start;
  }
  @media (max-width: 768px) { .ct-inner { grid-template-columns: 1fr; gap: 40px; } }

  /* LEFT */
  .ct-lbl     { font-size:11px;letter-spacing:.14em;color:#60a5fa;margin-bottom:14px }
  .ct-h2      { font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#f1f5f9;margin-bottom:8px }
  .ct-grad    { background:linear-gradient(130deg,#60a5fa,#a78bfa 60%,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text }
  .ct-divider { width:48px;height:2px;background:linear-gradient(90deg,#60a5fa,#a78bfa);border-radius:2px;margin:20px 0 28px }
  .ct-desc    { font-family:'Inter',sans-serif;font-size:.95rem;line-height:1.8;color:#64748b;margin-bottom:36px }
  .ct-desc em { color:#7dd3fc;font-style:normal }

  .info-list            { display:flex;flex-direction:column }
  .info-row             { display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.04) }
  .info-row:last-child  { border-bottom:none }
  .info-icon            { width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.15);flex-shrink:0 }
  .info-icon svg        { width:15px;height:15px;stroke:#60a5fa;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round }
  .info-label           { font-size:10px;color:#3d5a7a;letter-spacing:.08em;margin-bottom:3px }
  .info-val             { font-size:12.5px;color:#94a3b8 }
  .info-val a           { color:#60a5fa;text-decoration:none }
  .info-val a:hover     { color:#93c5fd }

  /* RIGHT - form */
  .form-wrap {
    padding:1.5px;border-radius:14px;
    background:conic-gradient(from var(--ba),transparent 80%,#60a5fa 88%,#a78bfa 93%,#f472b6 97%,transparent);
    animation:border-spin 3.5s linear infinite;
  }
  .form-box   { background:#080f20;border-radius:13px;padding:28px;display:flex;flex-direction:column;gap:0 }
  .form-bar   { background:#0d1830;padding:10px 16px;margin:-28px -28px 24px;border-radius:11px 11px 0 0;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,.05) }
  .form-dot-r { width:10px;height:10px;border-radius:50%;background:#ff5f57 }
  .form-dot-y { width:10px;height:10px;border-radius:50%;background:#ffbd2e }
  .form-dot-g { width:10px;height:10px;border-radius:50%;background:#28c840 }
  .form-title { font-size:11px;color:#3d5070;margin-left:8px;letter-spacing:.06em }
  .form-cur   { display:inline-block;width:2px;height:12px;background:#60a5fa;border-radius:1px;margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite }

  .field      { margin-bottom:16px }
  .field-lbl  { font-size:11px;color:#3d5a7a;letter-spacing:.06em;margin-bottom:7px;font-family:'Inter',sans-serif }
  .f-input, .f-textarea {
    width:100%;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);
    border-radius:8px;padding:11px 14px;color:#e2e8f0;
    font-family:'Inter',sans-serif;font-size:13.5px;outline:none;
    transition:border-color .2s,background .2s;
  }
  .f-input::placeholder, .f-textarea::placeholder { color:#2d3f55 }
  .f-input:focus, .f-textarea:focus { border-color:rgba(96,165,250,.45);background:rgba(96,165,250,.04) }
  .f-textarea { resize:vertical;min-height:110px }

  .send-wrap {
    padding:1.5px;border-radius:10px;width:fit-content;cursor:pointer;
    background:conic-gradient(from var(--ba),transparent 78%,#60a5fa 86%,#a78bfa 92%,#f472b6 97%,transparent);
    animation:border-spin 2.4s linear infinite;
    margin-top:4px;
  }
  .send-btn {
    display:flex;align-items:center;gap:8px;
    padding:11px 26px;border-radius:9px;
    background:#0b1425;color:#e2e8f0;
    font-family:'Inter',sans-serif;font-size:13px;font-weight:500;
    border:none;outline:none;cursor:pointer;transition:background .2s;
  }
  .send-btn:hover    { background:#111f38 }
  .send-btn:disabled { opacity:.5;cursor:not-allowed }

  .form-status { margin-top:14px;font-size:13px;font-family:'Inter',sans-serif;padding:10px 14px;border-radius:8px;text-align:center }
  .form-status.success { color:#22c55e;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2) }
  .form-status.error   { color:#f87171;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2) }
`;

// ── Icons ─────────────────────────────────────────────────────
const IconMail = () => (
  <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
);
const IconGithub = () => (
  <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

// ── 🔗 Update your links here ─────────────────────────────────
const INFO = [
  { Icon: IconMail,     label: "EMAIL",    value: "prabaldas421@gmail.com",   href: "mailto:prabaldas421@gmail.com" },
  { Icon: IconPin,      label: "LOCATION", value: "Assam, India — 781329",    href: null },
  { Icon: IconGithub,   label: "GITHUB",   value: "github.com/yourname",      href: "https://github.com/Prabalbytes" },
  { Icon: IconLinkedin, label: "LINKEDIN", value: "linkedin.com/in/yourname", href: "https://www.linkedin.com/in/prabal-das-a89604296" },
];

// ── Framer Motion variants ────────────────────────────────────
const stagger    = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp     = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const slideRight = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

// ── Component ─────────────────────────────────────────────────
function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="contact" className="ct-section">
        <div className="ct-grid-bg" />
        <div className="ct-glow-l" />
        <div className="ct-glow-r" />

        <div className="ct-inner">

          {/* ── LEFT ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div className="ct-lbl" variants={fadeUp}>
              // contact.init()
            </motion.div>

            <motion.h2 className="ct-h2" variants={fadeUp}>
              Let's <span className="ct-grad">Talk</span>
            </motion.h2>

            <motion.div className="ct-divider" variants={fadeUp} />

            <motion.p className="ct-desc" variants={fadeUp}>
              Got a project idea, a job opportunity, or just want to say hi?
              My inbox is always open — I'll get back to you as soon as I can.
            </motion.p>

            <motion.div className="info-list" variants={stagger}>
              {INFO.map(({ Icon, label, value, href }) => (
                <motion.div className="info-row" key={label} variants={fadeUp}>
                  <div className="info-icon"><Icon /></div>
                  <div>
                    <div className="info-label">{label}</div>
                    <div className="info-val">
                      {href
                        ? <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                        : value
                      }
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT (form) ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="form-wrap">
              <div className="form-box">

                {/* Terminal bar */}
                <div className="form-bar">
                  <div className="form-dot-r" />
                  <div className="form-dot-y" />
                  <div className="form-dot-g" />
                  <span className="form-title">
                    new_message.ts<span className="form-cur" />
                  </span>
                </div>

                {/* Name */}
                <div className="field">
                  <div className="field-lbl">Your name</div>
                  <input
                    className="f-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="field">
                  <div className="field-lbl">Your email</div>
                  <input
                    className="f-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message */}
                <div className="field">
                  <div className="field-lbl">Your message</div>
                  <textarea
                    className="f-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hey Prabal, I wanted to reach out about..."
                  />
                </div>

                {/* Submit */}
                <motion.div
                  className="send-wrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <button
                    className="send-btn"
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send it →"}
                  </button>
                </motion.div>

                {/* Feedback */}
                {status === "success" && (
                  <div className="form-status success">
                    ✓ Message sent! I'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="form-status error">
                    ✕ Something went wrong. Please try again.
                  </div>
                )}

              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Contact;
