import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiCode() {
  const [unlocked, setUnlocked] = useState(false);
  const [position, setPosition] = useState(0);

  const handleKey = useCallback(
    (e) => {
      if (unlocked) return;
      const expected = SEQUENCE[position];
      if (e.key === expected) {
        const next = position + 1;
        if (next === SEQUENCE.length) {
          setUnlocked(true);
          setTimeout(() => setUnlocked(false), 4000);
          setPosition(0);
        } else {
          setPosition(next);
        }
      } else {
        setPosition(0);
      }
    },
    [position, unlocked]
  );

  // Console easter egg
  useEffect(() => {
    console.log(
      "%cShivam Bomble's Portfolio",
      "color: #10b981; font-size: 20px; font-weight: bold; padding: 8px 0;"
    );
    console.log(
      "%cBuilt with React + Framer Motion + Passion",
      "color: #059669; font-size: 12px; padding: 4px 0;"
    );
    console.log(
      "%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #047857; font-size: 11px; font-style: italic;"
    );
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="konami-content">
            <motion.div
              className="konami-emoji"
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              
            </motion.div>
            <h2 className="konami-title">KONAMI CODE ACTIVATED!</h2>
            <p className="konami-text">You found the easter egg! You're clearly a person of culture.</p>
            <div className="konami-buttons">
              {["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"].map((btn, i) => (
                <motion.span
                  key={i}
                  className="konami-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {btn}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Confetti particles */}
          <div className="konami-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="konami-particle"
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{
                  opacity: 0,
                  y: -200 - Math.random() * 300,
                  x: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
                style={{
                  left: `${50 + (Math.random() - 0.5) * 20}%`,
                  top: "50%",
                  color: ["#10b981", "#059669", "#4ade80", "#8b5cf6", "#f59e0b"][i % 5],
                  fontSize: `${0.8 + Math.random() * 1.2}rem`,
                }}
              >
                {["✦", "★", "◆", "●", "✦"][i % 5]}
              </motion.div>
            ))}
          </div>

          <style>{`
            .konami-overlay {
              position: fixed;
              inset: 0;
              z-index: 99998;
              background: rgba(0, 0, 0, 0.85);
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(8px);
              pointer-events: none;
            }

            .konami-content {
              text-align: center;
              z-index: 1;
            }

            .konami-emoji {
              font-size: 4rem;
              margin-bottom: 16px;
              display: block;
            }

            .konami-title {
              font-size: 1.8rem;
              font-weight: 800;
              background: linear-gradient(135deg, #10b981, #059669, #4ade80);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 8px;
            }

            .konami-text {
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.95rem;
              margin-bottom: 20px;
            }

            .konami-buttons {
              display: flex;
              gap: 6px;
              justify-content: center;
              flex-wrap: wrap;
            }

            .konami-btn {
              width: 36px;
              height: 36px;
              border-radius: 8px;
              background: rgba(16, 185, 129, 0.15);
              border: 1px solid rgba(16, 185, 129, 0.3);
              color: #10b981;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 600;
            }

            .konami-particles {
              position: absolute;
              inset: 0;
              pointer-events: none;
              overflow: hidden;
            }

            .konami-particle {
              position: absolute;
              font-weight: 700;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
