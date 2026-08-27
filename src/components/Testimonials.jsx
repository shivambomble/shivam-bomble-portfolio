import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Deepa Karandikar",
    role: "Director Training and Placements, SSPU",
    text: "Shivam stands out for his excellent communication skills and natural leadership ability. He approaches complex problems with a structured mindset and consistently delivers solutions that go beyond expectations.",
    rating: 5,
  },
  {
    name: "Devansh Timbadia",
    role: "Product Lead, OORJAA Tech",
    text: "His ML pipeline for sales analytics was delivered ahead of schedule. Shivam has a rare combination of data science depth and the ability to communicate insights to non-technical stakeholders.",
    rating: 5,
  },
  {
    name: "Saakshi Jaiswal",
    role: "Analyst, Neostats",
    text: "I've worked with Shivam on multiple projects. His passion for AI is infectious, and he has a way of making complex concepts accessible. A true team player and problem solver.",
    rating: 5,
  },
  {
    name: "Nizar Banu P K",
    role: "Research Guide, CHRIST University",
    text: "Shivam's work on Convolutional Neural Networks showed strong grasp of deep learning fundamentals. His CNN-based research paper was well-structured with solid experimental methodology and clear results.",
    rating: 5,
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (idx) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <motion.div
      className="testimonials-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="testimonials-heading">What People Say</h3>

      <div className="testimonials-track">
        <button className="testimonials-arrow testimonials-prev" onClick={prev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="testimonials-content">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              className="testimonial-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Quote icon */}
              <div className="testimonial-quote-icon">"</div>

              {/* Stars */}
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#10b981">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="testimonial-text">{t.text}</p>

              {/* Author */}
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="testimonials-arrow testimonials-next" onClick={next} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="testimonials-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonials-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        .testimonials-container {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .testimonials-heading {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 28px;
        }

        .testimonials-track {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .testimonials-arrow {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .testimonials-arrow:hover {
          border-color: rgba(16, 185, 129, 0.3);
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
        }

        .testimonials-content {
          flex: 1;
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          width: 100%;
          position: relative;
        }

        .testimonial-quote-icon {
          font-size: 3rem;
          line-height: 1;
          color: rgba(16, 185, 129, 0.2);
          font-family: Georgia, serif;
          margin-bottom: 4px;
        }

        .testimonial-stars {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 16px;
        }

        .testimonial-text {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 24px;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .testimonial-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(4, 120, 87, 0.2));
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: #10b981;
          flex-shrink: 0;
        }

        .testimonial-name {
          font-weight: 600;
          color: #fff;
          font-size: 0.9rem;
        }

        .testimonial-role {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.8rem;
          margin-top: 2px;
        }

        .testimonials-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
        }

        .testimonials-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .testimonials-dot.active {
          background: #10b981;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 640px) {
          .testimonials-content { min-height: 300px; }
          .testimonial-card { padding: 24px 16px; }
          .testimonial-text { font-size: 0.88rem; }
          .testimonials-arrow { display: none; }
        }
      `}</style>
    </motion.div>
  );
}
