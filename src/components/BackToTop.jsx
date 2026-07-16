import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THRESHOLD = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>

          <style>{`
            .back-to-top {
              position: fixed;
              bottom: 32px;
              right: 32px;
              z-index: 999;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: 1px solid rgba(217, 119, 6, 0.25);
              background: rgba(15, 15, 20, 0.85);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              color: #d97706;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 119, 6, 0.06);
              transition: border-color 0.3s ease, box-shadow 0.3s ease;
              outline: none;
            }

            .back-to-top::after {
              content: "";
              position: absolute;
              inset: -1px;
              border-radius: 50%;
              background: conic-gradient(from 0deg, transparent, rgba(217, 119, 6, 0.15), transparent, rgba(217, 119, 6, 0.15), transparent);
              z-index: -1;
              animation: rotateGlow 4s linear infinite;
              mask: radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px));
              -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px));
            }

            .back-to-top:hover {
              border-color: rgba(217, 119, 6, 0.5);
              box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(217, 119, 6, 0.15);
            }

            .back-to-top:focus-visible {
              outline: 2px solid rgba(217, 119, 6, 0.6);
              outline-offset: 3px;
            }

            @keyframes rotateGlow {
              to { transform: rotate(360deg); }
            }

            @media (max-width: 640px) {
              .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 42px;
                height: 42px;
              }
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
