export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo gradient-text">SB</span>
            <p className="footer-tagline">
              Building the future with AI and code.
            </p>
          </div>
          <nav className="footer-nav">
            <a href="#home" className="footer-link">Home</a>
            <a href="#education" className="footer-link">Education</a>
            <a href="#experience" className="footer-link">Experience</a>
            <a href="#skills" className="footer-link">Skills</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#contact" className="footer-link">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {year} Shivam Bomble. Crafted with passion.
          </p>
          <p className="footer-built-with">
            Hasta la vista
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 60px 24px 32px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .footer-logo {
          font-size: 2rem;
          font-weight: 800;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          margin-top: 8px;
        }

        .footer-nav {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 6px 14px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-copyright {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.8rem;
        }

        .footer-built-with {
          color: rgba(255, 255, 255, 0.2);
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer-nav {
            justify-content: center;
          }

          .footer-bottom {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
