import { motion } from "framer-motion";
import { education } from "../data/portfolioData";
import { cardVariants, itemVariants } from "../data/animationVariants";
import AnimatedSection from "./AnimatedSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

export default function Education() {
  return (
    <AnimatedSection id="education" className="section">
      <motion.div className="orb orb-3" style={{ width: "350px", height: "350px", background: "#92400e" }} />

      <div className="section-container">
        <div className="side-decor side-decor-left">
          <span className="decor-symbol">&lt;/&gt;</span>
          <span className="decor-symbol">{ }</span>
          <span className="decor-symbol">#</span>
          <span className="decor-symbol">!=</span>
          <span className="decor-symbol">=&gt;</span>
          <span className="decor-symbol">:=</span>
          <div className="decor-line decor-line-left"></div>
          <span className="decor-symbol">**</span>
          <span className="decor-symbol">/*</span>
          <span className="decor-symbol">++</span>
        </div>
        <div className="side-decor side-decor-right">
          <span className="decor-symbol decor-symbol-right">∑</span>
          <span className="decor-symbol decor-symbol-right">π</span>
          <span className="decor-symbol decor-symbol-right">Δ</span>
          <span className="decor-symbol decor-symbol-right">∞</span>
          <span className="decor-symbol decor-symbol-right">θ</span>
          <span className="decor-symbol decor-symbol-right">λ</span>
          <div className="decor-line decor-line-right"></div>
          <span className="decor-symbol decor-symbol-right">√</span>
          <span className="decor-symbol decor-symbol-right">∫</span>
          <span className="decor-symbol decor-symbol-right">≈</span>
        </div>
        <h2 className="section-title">
          <span className="highlight">Education</span>
        </h2>

        <motion.div
          className="education-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              className="education-card glass-card"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015, borderColor: "rgba(217, 119, 6, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="edu-year"
                whileHover={{ scale: 1.05 }}
              >
                {item.year}
              </motion.div>
              <div className="edu-content">
                <h3 className="edu-degree">{item.degree}</h3>
                <h4 className="edu-institution">{item.institution}</h4>
                <p className="edu-description">{item.description}</p>
                {item.highlights && (
                  <ul className="edu-highlights">
                    {item.highlights.map((h, i) => {
                      const isPaper = item.paperUrl && h.includes("Published paper");
                      return (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          whileHover={{ scale: 1.04, y: -1, backgroundColor: "rgba(217, 119, 6, 0.1)", borderColor: "rgba(217, 119, 6, 0.2)" }}
                        >
                          {isPaper ? (
                            <a href={item.paperUrl} target="_blank" rel="noopener noreferrer" className="edu-paper-link">
                              {h}
                              <motion.svg
                                width="12" height="12" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                whileHover={{ x: 2, y: -2 }}
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </motion.svg>
                            </a>
                          ) : (
                            h
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <motion.div className="edu-icon">
                <motion.svg
                  width="32" height="32" viewBox="0 0 24 24" fill="none"
                  stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  whileHover={{ rotate: [0, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </motion.svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .education-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          isolation: isolate;
        }

        .education-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: linear-gradient(135deg, transparent 30%, rgba(217, 119, 6, 0.1), rgba(234, 88, 12, 0.05), transparent 70%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .education-card:hover::after {
          opacity: 1;
        }

        .edu-year {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
        }

        .education-timeline {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .education-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 24px;
          align-items: start;
          padding: 32px;
        }

        .edu-year {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ea580c;
          background: rgba(234, 88, 12, 0.1);
          padding: 6px 16px;
          border-radius: 8px;
          white-space: nowrap;
          border: 1px solid rgba(234, 88, 12, 0.2);
        }

        .edu-degree {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .edu-institution {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          margin-bottom: 12px;
        }

        .edu-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .edu-highlights {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .edu-highlights li {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: default;
        }

        .edu-highlights li::before {
          content: "\\25B9 ";
          color: #d97706;
        }

        .edu-paper-link {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .edu-icon {
          display: flex;
          align-items: flex-start;
          padding-top: 4px;
        }

        @media (max-width: 768px) {
          .education-card {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .edu-icon {
            display: none;
          }
        }
      `}</style>
    </AnimatedSection>
  );
}
