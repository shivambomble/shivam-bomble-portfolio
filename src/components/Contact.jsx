import { useState } from "react";
import { motion } from "framer-motion";

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
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <div className="ct">
      {submitted && (
        <div className="ct-toast ct-toast-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
          Message sent successfully!
        </div>
      )}
      {error && !submitted && (
        <div className="ct-toast ct-toast-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Failed to send. Try again.
        </div>
      )}
      <form className="ct-form" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value="New message from portfolio" />
        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-name">Name</label>
          <input
            id="ct-name"
            name="name"
            type="text"
            className="ct-input"
            placeholder="Your name"
            required
          />
        </div>

        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-email">Email</label>
          <input
            id="ct-email"
            name="email"
            type="email"
            className="ct-input"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-msg">Message</label>
          <textarea
            id="ct-msg"
            name="message"
            className="ct-input ct-textarea"
            placeholder="Your message..."
            rows="4"
            required
          />
        </div>

        {error && (
          <motion.p
            className="ct-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Something went wrong. Try again.
          </motion.p>
        )}

        <motion.button
          type="submit"
          className="ct-submit"
          disabled={submitted}
          whileHover={!submitted ? { scale: 1.02 } : {}}
          whileTap={!submitted ? { scale: 0.97 } : {}}
        >
          {submitted ? "Sent!" : "Send Message"}
        </motion.button>
      </form>

      <style>{`
        .ct { width: 100%; }

        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ct-field { display: flex; flex-direction: column; gap: 6px; }

        .ct-label {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        .ct-input {
          padding: 10px 14px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 15, 12, 0.85);
          color: #f0fdf4;
          font-size: 0.85rem;
          font-family: "Inter", sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .ct-input:focus {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .ct-input::placeholder {
          color: rgba(255, 255, 255, 0.18);
        }

        .ct-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .ct-error {
          font-size: 0.78rem;
          color: #f87171;
        }

        .ct-toast {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .ct-toast-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .ct-toast-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
        }

        .ct-submit {
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: "Inter", sans-serif;
        }

        .ct-submit:hover:not(:disabled) {
          background: rgba(16, 185, 129, 0.18);
          border-color: rgba(16, 185, 129, 0.35);
        }

        .ct-submit:disabled {
          opacity: 0.7;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
