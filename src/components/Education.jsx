import { education } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="orb orb-3" style={{ width: "350px", height: "350px", background: "#92400e" }}></div>

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

        <div className="education-timeline">
          {education.map((item, index) => (
            <div
              key={index}
              className="education-card glass-card animate-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="edu-year">{item.year}</div>
              <div className="edu-content">
                <h3 className="edu-degree">{item.degree}</h3>
                <h4 className="edu-institution">{item.institution}</h4>
                <p className="edu-description">{item.description}</p>
                {item.highlights && (
                  <ul className="edu-highlights">
                    {item.highlights.map((h, i) => {
                      const isPaper = item.paperUrl && h.includes("Published paper");
                      return (
                        <li key={i}>
                          {isPaper ? (
                            <a href={item.paperUrl} target="_blank" rel="noopener noreferrer" className="edu-paper-link">
                              {h}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            </a>
                          ) : (
                            h
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="edu-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .education-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }

        .education-card:hover {
          transform: translateY(-8px) scale(1.015) !important;
          border-color: rgba(217, 119, 6, 0.2) !important;
          box-shadow: 0 20px 60px rgba(217, 119, 6, 0.08), 0 0 40px rgba(217, 119, 6, 0.03) !important;
        }

        .education-card:hover .edu-icon svg {
          animation: iconBounce 0.5s ease;
        }

        @keyframes iconBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2) rotate(-5deg); }
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
        }

        .edu-highlights li::before {
          content: "▹ ";
          color: #d97706;
        }

        .edu-paper-link {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
        }

        .edu-paper-link:hover {
          color: #d97706;
          gap: 6px;
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
    </section>
  );
}
