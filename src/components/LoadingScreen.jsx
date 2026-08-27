import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => onComplete?.(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="ls"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
              <motion.div
                className="ls-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
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
