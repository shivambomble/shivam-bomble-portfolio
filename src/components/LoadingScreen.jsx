import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enough time for the intro to register, but short enough that a fast load
// never feels like an artificial delay.
const MIN_VISIBLE = 700;
// Insurance: never hold the page hostage to a slow font or image.
const MAX_WAIT = 4000;
// Matches the exit animation below.
const EXIT_MS = 420;

export default function LoadingScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // "Ready" means fonts are usable and the page's images/scripts have loaded.
    const assetsReady = new Promise((resolve) => {
      const done = () => resolve();
      if (document.readyState === "complete") done();
      else window.addEventListener("load", done, { once: true });
      document.fonts?.ready.then(done);
      setTimeout(done, MAX_WAIT);
    });

    assetsReady.then(() => { if (!cancelled) setReady(true); });

    Promise.all([new Promise((r) => setTimeout(r, MIN_VISIBLE)), assetsReady]).then(() => {
      if (cancelled) return;
      setExiting(true);
      setTimeout(() => { if (!cancelled) onComplete?.(); }, EXIT_MS);
    });

    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="ls"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ls-content">
            <motion.h1
              className="ls-text"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Hola amigo
            </motion.h1>

            <motion.div
              className="ls-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Stops at 90% until the page is actually ready, so a slow
                  load doesn't look finished while the overlay is still up. */}
              <motion.div
                className="ls-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: ready ? "100%" : "90%" }}
                transition={{
                  duration: ready ? 0.35 : MIN_VISIBLE / 1000,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          <style>{`
            .ls {
              position: fixed;
              inset: 0;
              z-index: 99999;
              background: #080c0a;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .ls-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
            }

            .ls-text {
              font-size: clamp(1.4rem, 4vw, 2rem);
              font-weight: 600;
              color: #f0fdf4;
              letter-spacing: -0.5px;
            }

            .ls-bar {
              width: 160px;
              height: 2px;
              background: rgba(255, 255, 255, 0.06);
              border-radius: 2px;
              overflow: hidden;
            }

            .ls-bar-fill {
              height: 100%;
              background: #10b981;
              border-radius: 2px;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
