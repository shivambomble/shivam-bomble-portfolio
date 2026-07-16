import { motion } from "framer-motion";
import { experience } from "../data/portfolioData";
import { cardVariants } from "../data/animationVariants";
import AnimatedSection from "./AnimatedSection";

const timelineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const timelineItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const achievementVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="section">
      <div className="orb orb-1" style={{ width: "400px", height: "400px", background: "#ea580c", top: "60%", left: "-5%" }} />

      <div className="section-container">
        <div className="side-decor side-decor-left">
          <span className="decor-symbol">[ ]</span>
          <span className="decor-symbol">()</span>
          <span className="decor-symbol">{`=>`}</span>
          <span className="decor-symbol">!!</span>
          <span className="decor-symbol">??</span>
          <span className="decor-symbol">{`?.()`}</span>
          <div className="decor-line decor-line-left"></div>
          <span className="decor-symbol">{`=>`}</span>
          <span className="decor-symbol">/&gt;</span>
          <span className="decor-symbol">#!</span>
        </div>
        <div className="side-decor side-decor-right">
          <span className="decor-symbol decor-symbol-right">▲</span>
          <span className="decor-symbol decor-symbol-right">◆</span>
          <span className="decor-symbol decor-symbol-right">⬡</span>
          <span className="decor-symbol decor-symbol-right">◎</span>
          <span className="decor-symbol decor-symbol-right">◇</span>
          <span className="decor-symbol decor-symbol-right">△</span>
          <div className="decor-line decor-line-right"></div>
          <span className="decor-symbol decor-symbol-right">○</span>
          <span className="decor-symbol decor-symbol-right">□</span>
          <span className="decor-symbol decor-symbol-right">☆</span>
        </div>
        <h2 className="section-title">
          <span className="highlight">Work Experience</span>
        </h2>

        <motion.div
          className="exp-timeline"
          variants={timelineContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experience.map((item, index) => (
            <motion.div key={index} className="exp-item" variants={timelineItem}>
              <div className="exp-line">
                <motion.div
                  className="exp-dot"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.5 }}
                />
                {index < experience.length - 1 && (
                  <motion.div
                    className="exp-connector"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </div>

              <motion.div
                className="exp-card glass-card"
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="exp-header">
                  <div className="exp-role-company">
                    <h3 className="exp-role">{item.role}</h3>
                    <h4 className="exp-company">{item.company}</h4>
                  </div>
                  <motion.span
                    className="exp-period"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.period}
                  </motion.span>
                </div>

                <p className="exp-description">{item.description}</p>

                <motion.ul
                  className="exp-achievements"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {item.achievements.map((ach, i) => (
                    <motion.li
                      key={i}
                      custom={i}
                      variants={achievementVariant}
                      whileHover={{ x: 4, color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      {ach}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .exp-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97706, #92400e);
          border: 3px solid rgba(10, 10, 15, 1);
          box-shadow: 0 0 20px rgba(217, 119, 6, 0.3);
          z-index: 1;
          flex-shrink: 0;
          margin-top: 8px;
        }

        .exp-connector {
          width: 2px;
          flex: 1;
          background: linear-gradient(180deg, rgba(217, 119, 6, 0.4), rgba(146, 64, 14, 0.4));
          min-height: 40px;
          position: relative;
        }

        .exp-connector::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, rgba(217, 119, 6, 0.4), rgba(146, 64, 14, 0.4));
          border-radius: 2px;
          filter: blur(2px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .exp-item:hover .exp-connector::after {
          opacity: 1;
        }

        .exp-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          isolation: isolate;
          margin-bottom: 24px;
        }

        .exp-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: linear-gradient(135deg, transparent 30%, rgba(217, 119, 6, 0.08), transparent 70%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .exp-card:hover::after {
          opacity: 1;
        }

        .exp-period {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .exp-timeline {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .exp-item {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 24px;
          position: relative;
        }

        .exp-line {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .exp-role {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
        }

        .exp-company {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          margin-top: 2px;
        }

        .exp-period {
          font-size: 0.85rem;
          color: #ea580c;
          background: rgba(234, 88, 12, 0.1);
          padding: 4px 12px;
          border-radius: 8px;
          white-space: nowrap;
          border: 1px solid rgba(234, 88, 12, 0.2);
        }

        .exp-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .exp-achievements {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .exp-achievements li {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          padding-left: 20px;
          position: relative;
          line-height: 1.6;
        }

        .exp-achievements li::before {
          content: "\\2192";
          position: absolute;
          left: 0;
          color: #92400e;
        }

        @media (max-width: 768px) {
          .exp-item {
            grid-template-columns: 24px 1fr;
            gap: 16px;
          }

          .exp-dot {
            width: 12px;
            height: 12px;
          }

          .exp-header {
            flex-direction: column;
          }
        }
      `}</style>
    </AnimatedSection>
  );
}
