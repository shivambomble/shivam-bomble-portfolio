import { experience } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="orb orb-1" style={{ width: "400px", height: "400px", background: "#ea580c", top: "60%", left: "-5%" }}></div>

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

        <div className="exp-timeline">
          {experience.map((item, index) => (
            <div key={index} className="exp-item animate-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="exp-line">
                <div className="exp-dot"></div>
                {index < experience.length - 1 && <div className="exp-connector"></div>}
              </div>

              <div className="exp-card glass-card">
                <div className="exp-header">
                  <div className="exp-role-company">
                    <h3 className="exp-role">{item.role}</h3>
                    <h4 className="exp-company">{item.company}</h4>
                  </div>
                  <span className="exp-period">{item.period}</span>
                </div>

                <p className="exp-description">{item.description}</p>

                <ul className="exp-achievements">
                  {item.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-dot {
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
          50% { box-shadow: 0 0 35px rgba(217, 119, 6, 0.6), 0 0 60px rgba(217, 119, 6, 0.15); }
        }

        .exp-connector {
          animation: connectorGrow 1s ease forwards;
          transform-origin: top;
          transform: scaleY(0);
        }

        .exp-item.animate-in .exp-connector {
          animation: connectorGrow 0.8s ease forwards 0.3s;
        }

        @keyframes connectorGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        .exp-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }

        .exp-card:hover {
          transform: translateY(-6px) scale(1.012) !important;
        }

        .exp-achievements li {
          transition: all 0.3s ease;
        }

        .exp-achievements li:hover {
          color: rgba(255, 255, 255, 0.8);
          padding-left: 24px;
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
        }

        .exp-card {
          margin-bottom: 24px;
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
          content: "→";
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
    </section>
  );
}
