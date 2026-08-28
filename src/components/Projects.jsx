import { motion } from "framer-motion";

const featuredRepos = [
  {
    name: "Interview-Rooms",
    description: "AI-powered campus interview management platform with real-time queue orchestration, smart notifications, and live dashboards for recruiters, placement cells, and students.",
    url: "https://github.com/shivambomble/Interview-Rooms",
    language: "Python",
  },
  {
    name: "org-eda-platform",
    description: "Multi-tenant data analysis platform with automated data cleaning workflows, real-time alerts, and collaborative project management using React, Hasura, Temporal, and PostgreSQL.",
    url: "https://github.com/shivambomble/org-eda-platform",
    language: "TypeScript",
  },
  {
    name: "Davakhana.AI",
    description: "AI-powered healthcare receptionist for appointment management with voice assistant, NLP intent recognition, and conversational booking built with Node.js, React, and Groq LLM.",
    url: "https://github.com/shivambomble/Davakhana.AI-Doctor-Receptionist-AI",
    language: "JavaScript",
  },
];

const languageColors = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  return (
    <div className="pj">
      <div className="pj-grid">
        {featuredRepos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pj-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.2)" }}
          >
            <div className="pj-card-top">
              <div className="pj-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <svg className="pj-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>

            <h3 className="pj-card-name">{repo.name}</h3>
            <p className="pj-card-desc">{repo.description}</p>

            <div className="pj-card-footer">
              <span className="pj-card-lang">
                <span className="pj-lang-dot" style={{ background: languageColors[repo.language] || "#8b5cf6" }} />
                {repo.language}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="pj-more"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <a
          href="https://github.com/shivambomble?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="pj-more-btn"
        >
          View All on GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </motion.div>

      <style>{`
        .pj { width: 100%; }

        .pj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .pj-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          background: rgba(10, 15, 12, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .pj-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .pj-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
        }

        .pj-card-arrow {
          color: rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
        }

        .pj-card:hover .pj-card-arrow {
          color: #10b981;
          transform: translate(2px, -2px);
        }

        .pj-card-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #f0fdf4;
        }

        .pj-card-desc {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          flex: 1;
        }

        .pj-card-footer {
          display: flex;
          align-items: center;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .pj-card-lang {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          color: rgba(255, 255, 255, 0.35);
        }

        .pj-lang-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .pj-more {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }

        .pj-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 15, 12, 0.85);
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          font-size: 0.82rem;
          transition: all 0.2s ease;
        }

        .pj-more-btn:hover {
          border-color: rgba(16, 185, 129, 0.25);
          color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }

        @media (max-width: 768px) {
          .pj-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
