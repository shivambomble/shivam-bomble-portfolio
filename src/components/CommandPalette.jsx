import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
  { name: "about", desc: "Who am I?" },
  { name: "education", desc: "Academic background" },
  { name: "experience", desc: "Work history" },
  { name: "skills", desc: "Technologies I work with" },
  { name: "contact", desc: "How to reach me" },
  { name: "resume", desc: "Download my resume" },
  { name: "clear", desc: "Clear the terminal" },
  { name: "help", desc: "Show available commands" },
];

export default function CommandPalette({ onRun }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = COMMANDS.filter(
    (c) => c.name.includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleKey = useCallback(
    (e) => {
      if (e.key === "?" && !open) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
        setQuery("");
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const select = (name) => {
    setOpen(false);
    if (onRun) onRun(name);
    // Scroll to terminal and run
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="cp-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cp-input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="cp-input"
                placeholder="Type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered.length > 0) select(filtered[0].name);
                }}
              />
              <span className="cp-esc">ESC</span>
            </div>

            <div className="cp-list">
              {filtered.map((c) => (
                <button key={c.name} className="cp-item" onClick={() => select(c.name)}>
                  <span className="cp-cmd">{c.name}</span>
                  <span className="cp-desc">{c.desc}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="cp-empty">No matching commands</div>
              )}
            </div>
          </motion.div>

          <style>{`
            .cp-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: flex-start;
              justify-content: center;
              padding-top: 20vh;
              backdrop-filter: blur(4px);
            }

            .cp-panel {
              width: 440px;
              max-width: 90vw;
              background: rgba(10, 15, 12, 0.97);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
            }

            .cp-input-wrap {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 14px 16px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
              color: rgba(255, 255, 255, 0.3);
            }

            .cp-input {
              flex: 1;
              background: none;
              border: none;
              outline: none;
              color: #f0fdf4;
              font-family: "JetBrains Mono", monospace;
              font-size: 0.85rem;
            }

            .cp-input::placeholder { color: rgba(255, 255, 255, 0.2); }

            .cp-esc {
              font-size: 0.65rem;
              color: rgba(255, 255, 255, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.08);
              padding: 2px 6px;
              border-radius: 4px;
              font-family: "JetBrains Mono", monospace;
            }

            .cp-list {
              max-height: 300px;
              overflow-y: auto;
              padding: 6px;
            }

            .cp-item {
              display: flex;
              align-items: center;
              gap: 12px;
              width: 100%;
              padding: 10px 12px;
              border: none;
              background: none;
              border-radius: 8px;
              cursor: pointer;
              text-align: left;
              transition: background 0.15s;
            }

            .cp-item:hover {
              background: rgba(16, 185, 129, 0.08);
            }

            .cp-cmd {
              font-family: "JetBrains Mono", monospace;
              font-size: 0.82rem;
              color: #10b981;
              font-weight: 600;
              min-width: 90px;
            }

            .cp-desc {
              font-size: 0.78rem;
              color: rgba(255, 255, 255, 0.35);
            }

            .cp-empty {
              padding: 20px;
              text-align: center;
              color: rgba(255, 255, 255, 0.25);
              font-size: 0.82rem;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
