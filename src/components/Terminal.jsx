import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  personalInfo,
  education,
  experience,
  skills,
} from "../data/portfolioData";
import Projects from "./Projects";
import GitHubHeatmap from "./GitHubHeatmap";
import LinkedInPosts from "./LinkedInPosts";
import Testimonials from "./Testimonials";
import DinoGame from "./DinoGame";
import Contact from "./Contact";
import ScrollReveal from "./ScrollReveal";

// ── Commands ───────────────────────────────────────────────────────────
const COMMANDS = {
  help: {
    output: [
      { t: "out", v: "Available commands:" },
      { t: "out", v: "" },
      { t: "out", v: "  about       Who am I?" },
      { t: "out", v: "  education   My academic background" },
      { t: "out", v: "  experience  Work history & achievements" },
      { t: "out", v: "  skills      Technologies I work with" },
      { t: "out", v: "  contact     How to reach me" },
      { t: "out", v: "  clear       Clear the terminal" },
    ],
  },
  about: {
    output: [
      { t: "exec", v: "$ whoami" },
      { t: "out", v: "" },
      { t: "hl", v: personalInfo.name },
      { t: "out", v: personalInfo.tagline },
      { t: "out", v: `  Location: ${personalInfo.location}` },
      { t: "out", v: "" },
      { t: "out", v: personalInfo.bio },
    ],
  },
  whoami: "about",
  education: {
    output: education.flatMap((edu) => [
      { t: "exec", v: `$ cat education/${edu.year}.md` },
      { t: "out", v: "" },
      { t: "hl", v: `  ${edu.degree}` },
      { t: "out", v: `  ${edu.institution}  |  ${edu.year}` },
      { t: "out", v: `  ${edu.description}` },
      ...edu.highlights.map((h) => ({ t: "dim", v: `  > ${h}` })),
      { t: "out", v: "" },
    ]),
  },
  experience: {
    output: experience.flatMap((exp) => [
      { t: "exec", v: `$ cat work/${exp.company.split(" ")[0].toLowerCase()}.md` },
      { t: "out", v: "" },
      { t: "hl", v: `  ${exp.role}` },
      { t: "out", v: `  ${exp.company}  |  ${exp.period}` },
      { t: "out", v: `  ${exp.description}` },
      ...exp.achievements.map((a) => ({ t: "dim", v: `  - ${a}` })),
      { t: "out", v: "" },
    ]),
  },
  work: "experience",
  skills: {
    output: [
      { t: "exec", v: "$ ls skills/" },
      { t: "out", v: "" },
      ...Object.entries(skills).flatMap(([cat, items]) => [
        { t: "hl", v: `  ${cat}/` },
        ...items.map((item) => ({ t: "dim", v: `    ${item}` })),
        { t: "out", v: "" },
      ]),
    ],
  },
  contact: {
    output: [
      { t: "exec", v: "$ cat ~/.contact" },
      { t: "out", v: "" },
      { t: "hl", v: "  Reach out:" },
      { t: "out", v: "" },
      { t: "out", v: `    Email    ${personalInfo.email}` },
      { t: "out", v: `    Location ${personalInfo.location}` },
      { t: "out", v: "" },
      { t: "out", v: `    GitHub   ${personalInfo.social.github}` },
      { t: "out", v: `    LinkedIn ${personalInfo.social.linkedin}` },
    ],
  },
  clear: { clear: true },
  ls: {
    output: [
      { t: "exec", v: "$ ls" },
      { t: "out", v: "" },
      { t: "hl", v: "  about/  education/  experience/" },
      { t: "hl", v: "  skills/  contact/" },
    ],
  },
};

// ── Main Component ─────────────────────────────────────────────────────
export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const focus = useCallback(() => inputRef.current?.focus(), []);

  const run = useCallback((cmd) => {
    const t = cmd.trim().toLowerCase();
    if (!t) return;
    setLines((p) => [...p, { t: "input", v: t }]);
    setCmdHistory((p) => [t, ...p]);
    setHistoryIdx(-1);
    setInput("");
    if (t === "clear") { setLines([]); return; }
    let def = COMMANDS[t];
    if (typeof def === "string") def = COMMANDS[def];
    if (def) {
      if (def.clear) { setLines([]); return; }
      if (def.output) setLines((p) => [...p, ...def.output]);
    } else {
      setLines((p) => [
        ...p,
        { t: "err", v: `  command not found: ${t}` },
        { t: "dim", v: '  Type "help" for available commands.' },
      ]);
    }
  }, []);

  const handleKey = useCallback((e) => {
    if (e.key === "Enter") { e.preventDefault(); run(input); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const i = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(i); setInput(cmdHistory[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) { setHistoryIdx((p) => p - 1); setInput(cmdHistory[historyIdx - 1]); }
      else { setHistoryIdx(-1); setInput(""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const c = input.toLowerCase();
      if (c) { const m = Object.keys(COMMANDS).find((k) => k.startsWith(c)); if (m) setInput(m); }
    }
  }, [input, cmdHistory, historyIdx, run]);

  const cls = (t) =>
    t === "input" ? "tl-input" :
    t === "hl"     ? "tl-hl" :
    t === "exec"   ? "tl-exec" :
    t === "err"    ? "tl-err" :
    t === "dim"    ? "tl-dim" :
                      "tl-out";

  return (
    <div className="tp">
      {/* ═══ FULL-WIDTH HEADER ═══ */}
      <header className="tp-header">
        <div className="tp-header-left">
          <span className="tp-header-name">Shivam Bomble</span>
        </div>
        <div className="tp-header-right">
          <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="tp-header-link">
            GitHub
          </a>
          <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="tp-header-link">
            LinkedIn
          </a>
          <a href={`mailto:${personalInfo.email}`} className="tp-header-link">
            Contact
          </a>
        </div>
      </header>

      {/* ═══ TERMINAL FULL SCREEN ═══ */}
      <section className="tp-hero">
        <div className="tp-terminal-wrap">
          {/* Terminal window */}
          <div className="tp-window">
            <div className="tp-window-bar">
              <span className="tp-dot tp-dot-r" />
              <span className="tp-dot tp-dot-y" />
              <span className="tp-dot tp-dot-g" />
              <span className="tp-window-title">portfolio ~ zsh</span>
            </div>

            <div className="tp-terminal" ref={termRef} onClick={focus}>
              {lines.length === 0 && (
                <div className="tp-welcome-text">
                  <p className="tw-line">Welcome. Type <code>help</code> to explore.</p>
                </div>
              )}

              {lines.map((l, i) => (
                <div key={i} className={`tl ${cls(l.t)}`}>
                  {l.t === "input" && <span className="tl-prompt">&gt; </span>}
                  {l.v}
                </div>
              ))}
            </div>

            <div className="tp-input-row" onClick={focus}>
              <span className="tl-prompt">&gt; </span>
              <input
                ref={inputRef}
                className="tp-input"
                value={input}
                onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1); }}
                onKeyDown={handleKey}
                placeholder="type a command..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </div>
          </div>

          {/* Quick actions */}
          <div className="tp-actions">
            {["about", "skills", "experience", "contact"].map((c) => (
              <button key={c} className="tp-action" onClick={() => run(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTIONS ═══ */}
      <div className="tp-sections">
        <section className="tp-section" id="projects">
          <ScrollReveal>
            <div className="tp-sec-inner">
              <h2 className="tp-sec-title"><span className="highlight">Projects</span></h2>
              <Projects />
            </div>
          </ScrollReveal>
        </section>

        <section className="tp-section" id="github">
          <ScrollReveal delay={0.05}>
            <div className="tp-sec-inner">
              <h2 className="tp-sec-title"><span className="highlight">GitHub Activity</span></h2>
              <GitHubHeatmap />
            </div>
          </ScrollReveal>
        </section>

        <section className="tp-section" id="linkedin">
          <ScrollReveal delay={0.1}>
            <div className="tp-sec-inner">
              <LinkedInPosts />
            </div>
          </ScrollReveal>
        </section>

        <section className="tp-section" id="reviews">
          <ScrollReveal delay={0.05}>
            <div className="tp-sec-inner">
              <h2 className="tp-sec-title"><span className="highlight">Recommendations</span></h2>
              <Testimonials />
            </div>
          </ScrollReveal>
        </section>

        <section className="tp-section" id="contact-game">
          <ScrollReveal delay={0.05}>
            <div className="tp-split">
              <div className="tp-split-left">
                <DinoGame />
              </div>
              <div className="tp-split-right">
                <h2 className="tp-sec-title"><span className="highlight">Get in Touch</span></h2>
                <Contact />
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="tp-footer">
        <span>&copy; {new Date().getFullYear()} {personalInfo.name}</span>
        <span>Built for Fun</span>
      </footer>

      <style>{`
        .tp { min-height: 100vh; }

        /* ═══ HEADER ═══ */
        .tp-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          background: rgba(8, 12, 10, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .tp-header-name {
          font-size: 1rem;
          font-weight: 600;
          color: #f0fdf4;
          letter-spacing: -0.3px;
        }

        .tp-header-right {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .tp-header-link {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s;
        }

        .tp-header-link:hover { color: #10b981; }

        /* ═══ HERO ═══ */
        .tp-hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 48px 48px;
          background: rgba(8, 12, 10, 0.6);
        }

        .tp-terminal-wrap {
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Window */
        .tp-window {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 15, 12, 0.97);
          overflow: hidden;
        }

        .tp-window-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: rgba(10, 15, 12, 0.98);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .tp-dot { width: 10px; height: 10px; border-radius: 50%; }
        .tp-dot-r { background: #ef4444; }
        .tp-dot-y { background: #eab308; }
        .tp-dot-g { background: #22c55e; }

        .tp-window-title {
          flex: 1;
          text-align: center;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.2);
          font-family: "JetBrains Mono", monospace;
          margin-right: 32px;
        }

        .tp-terminal {
          padding: 20px 20px;
          min-height: 350px;
          max-height: 55vh;
          overflow-y: auto;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.82rem;
          line-height: 1.8;
          cursor: text;
        }

        .tp-terminal::-webkit-scrollbar { width: 3px; }
        .tp-terminal::-webkit-scrollbar-track { background: transparent; }
        .tp-terminal::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.12); border-radius: 2px; }

        .tp-welcome-text { margin-bottom: 4px; }
        .tw-line { color: rgba(255, 255, 255, 0.4); font-size: 0.82rem; }
        .tw-line code {
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          padding: 1px 6px;
          border-radius: 3px;
        }

        .tp-input-row {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          cursor: text;
        }

        .tp-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #f0fdf4;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.82rem;
          caret-color: #10b981;
        }

        .tp-input::placeholder { color: rgba(255, 255, 255, 0.18); }

        /* Lines */
        .tl { white-space: pre-wrap; word-break: break-word; min-height: 1.5em; }
        .tl-input { color: #e2e8f0; }
        .tl-out { color: rgba(255, 255, 255, 0.5); }
        .tl-hl { color: #34d399; font-weight: 600; }
        .tl-exec { color: rgba(255, 255, 255, 0.35); }
        .tl-err { color: #f87171; }
        .tl-dim { color: rgba(255, 255, 255, 0.22); }
        .tl-prompt { color: #10b981; font-weight: 600; user-select: none; }

        /* Actions */
        .tp-actions { display: flex; gap: 8px; justify-content: center; }

        .tp-action {
          padding: 7px 16px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(10, 15, 12, 0.8);
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.76rem;
          font-family: "JetBrains Mono", monospace;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tp-action:hover {
          border-color: rgba(16, 185, 129, 0.25);
          color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }

        /* ═══ SECTIONS ═══ */
        .tp-sections {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
        }

        .tp-section { padding: 56px 0; position: relative; }

        .tp-sec-inner { width: 100%; }

        .tp-sec-title {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 28px;
          color: #f0fdf4;
          letter-spacing: -0.5px;
        }

        .tp-sec-title .highlight {
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Override legacy */
        .tp-sec-inner .section { min-height: unset; padding: 0; }
        .tp-sec-inner .section-container { max-width: 100%; }
        .tp-sec-inner .section-title { font-size: 0; margin: 0; }
        .tp-sec-inner .projects-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
        .tp-sec-inner .github-profile-link { display: none; }

        .tp-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .tp-split-left, .tp-split-right { width: 100%; }

        .tp-split-right .section { min-height: unset; padding: 0; }
        .tp-split-right .section-container { max-width: 100%; }
        .tp-split-right .section-title { font-size: 0; margin: 0; }

        @media (max-width: 768px) {
          .tp-split { grid-template-columns: 1fr; }
        }

        /* ═══ FOOTER ═══ */
        .tp-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          max-width: 1000px;
          width: 100%;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.12);
          font-size: 0.72rem;
        }

        @media (max-width: 768px) {
          .tp-header { padding: 12px 16px; }
          .tp-header-right { gap: 16px; }
          .tp-header-link { font-size: 0.76rem; }
          .tp-hero { padding: 70px 16px 32px; }
          .tp-terminal { min-height: 250px; max-height: 45vh; font-size: 0.74rem; padding: 14px 14px; }
          .tp-input-row { padding: 10px 14px; }
          .tp-sections { padding: 0 16px; }
          .tp-section { padding: 36px 0; }
          .tp-footer { flex-direction: column; align-items: center; gap: 4px; }
        }
      `}</style>
    </div>
  );
}
