import { personalInfo } from "../data/portfolioData";

export default function Hero() {
  return (
    <section id="home" className="section hero-section">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="section-container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-in animate-in-delay-1">
            <span className="badge-dot"></span>
            Open to opportunities
          </div>

          <h1 className="hero-title animate-in">
            Hi, I'm{" "}
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          <p className="hero-subtitle animate-in animate-in-delay-1">
            {personalInfo.tagline}
          </p>

          <p className="hero-description animate-in animate-in-delay-2">
            {personalInfo.bio}
          </p>

          <div className="hero-actions animate-in animate-in-delay-3">
            <a href="#projects" className="btn btn-primary">
              View My Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="hero-social animate-in animate-in-delay-3">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

          </div>
        </div>

        <div className="hero-visual animate-in animate-in-delay-2">
          <div className="hero-code-block">
            <div className="code-line"><span className="code-keyword">import</span> <span className="code-string">"future"</span></div>
            <div className="code-line"><span className="code-keyword">const</span> <span className="code-variable">builder</span> = <span className="code-keyword">new</span> <span className="code-function">Developer</span>()</div>
            <div className="code-line"><span className="code-variable">builder</span>.<span className="code-function">learn</span>(<span className="code-string">"AI"</span>)</div>
            <div className="code-line"><span className="code-variable">builder</span>.<span className="code-function">build</span>(<span className="code-string">"cool stuff"</span>)</div>
            <div className="code-line"><span className="code-variable">builder</span>.<span className="code-function">impact</span>(<span className="code-string">"the world"</span>)</div>
            <div className="code-line code-comment">// Let's create something amazing</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 100px;
          position: relative;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 50px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          width: fit-content;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
        }

        .hero-description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 500px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .hero-social {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(245, 158, 11, 0.15));
          color: #fff;
          border-color: rgba(16, 185, 129, 0.3);
          transform: translateY(-3px);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-code-block {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px;
          font-family: "JetBrains Mono", "Fira Code", monospace;
          font-size: 0.95rem;
          line-height: 2.2;
          min-width: 320px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .code-line {
          opacity: 0;
          animation: typeIn 0.5s ease forwards;
        }

        .code-line:nth-child(1) { animation-delay: 0.8s; }
        .code-line:nth-child(2) { animation-delay: 1.2s; }
        .code-line:nth-child(3) { animation-delay: 1.6s; }
        .code-line:nth-child(4) { animation-delay: 2.0s; }
        .code-line:nth-child(5) { animation-delay: 2.4s; }
        .code-line:nth-child(6) { animation-delay: 2.8s; }

        @keyframes typeIn {
          to { opacity: 1; }
        }

        .code-keyword { color: #ff79c6; }
        .code-string { color: #f1fa8c; }
        .code-variable { color: #50fa7b; }
        .code-function { color: #8be9fd; }
        .code-comment { color: #6272a4; font-style: italic; }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.8rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-content {
            align-items: center;
          }

          .hero-description {
            max-width: 100%;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-badge {
            margin: 0 auto;
          }

          .hero-code-block {
            min-width: unset;
            width: 100%;
            font-size: 0.8rem;
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
