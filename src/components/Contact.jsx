import { personalInfo } from "../data/portfolioData";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkodgvan", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        setError(false);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="orb orb-1" style={{ width: "450px", height: "450px", background: "#818cf8", top: "20%", left: "-10%" }}></div>
      <div className="orb orb-2" style={{ width: "350px", height: "350px", background: "#06b6d4", bottom: "10%", right: "-5%" }}></div>

      <div className="section-container">
        <h2 className="section-title">
          <span className="highlight">Get In Touch</span>
        </h2>

        <div className="contact-content">
          <div className="contact-info animate-in">
            <h3 className="contact-heading">Let's work together</h3>
            <p className="contact-text">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out!
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="contact-detail-label">Email</span>
                  <span className="contact-detail-value">{personalInfo.email}</span>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

            </div>
          </div>

          <form className="contact-form animate-in animate-in-delay-1" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New message from your portfolio!" />
            <input type="text" name="_gotcha" style={{ display: "none" }} />
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email-input" className="form-label">Email</label>
              <input type="email" id="email-input" name="email" className="form-input" placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-input form-textarea" placeholder="Tell me about your project..." rows="5" required></textarea>
            </div>
            {error && <p className="form-error">Something went wrong. Please try again or email me directly.</p>}
            <button type="submit" className="btn btn-primary submit-btn" disabled={submitted}>
              {submitted ? "Message Sent!" : "Send Message"}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-heading {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
        }

        .contact-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          line-height: 1.7;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-detail {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .contact-detail-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: #06b6d4;
          flex-shrink: 0;
        }

        .contact-detail-label {
          display: block;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 2px;
        }

        .contact-detail-value {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-social {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .contact-social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .contact-social-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          border-color: rgba(6, 182, 212, 0.3);
          transform: translateY(-2px);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .form-input {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
          background: rgba(255, 255, 255, 0.06);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-error {
          color: #ef4444;
          font-size: 0.85rem;
          text-align: center;
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .submit-btn {
          align-self: flex-start;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-social {
            flex-wrap: wrap;
          }

          .contact-form {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
