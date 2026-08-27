import { motion } from "framer-motion";

const posts = [
  {
    url: "https://lnkd.in/p/d3NQpuBV",
    title: "AI Generated Content Needs Provenance",
    excerpt: "Detection alone is not enough. We need systems that track where AI content comes from, how it was made, and who is responsible. Provenance is the real solution.",
    tags: ["AI", "Content Authenticity", "Provenance"],
  },
  {
    url: "https://lnkd.in/p/dfpMeJ4z",
    title: "Enterprise AI Agents",
    excerpt: "The shift from chatbots to autonomous agents is happening now. Enterprise AI agents can plan, reason, and execute multi-step workflows across business systems.",
    tags: ["AI Agents", "Enterprise", "Automation"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function LinkedInPosts() {
  return (
    <div className="li">
      <h2 className="li-heading">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn Posts
      </h2>

      <div className="li-grid">
        {posts.map((post, i) => (
          <motion.a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="li-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -3, borderColor: "rgba(10, 102, 194, 0.25)" }}
          >
            <div className="li-card-header">
              <div className="li-card-logo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <svg className="li-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>

            <h3 className="li-card-title">{post.title}</h3>
            <p className="li-card-excerpt">{post.excerpt}</p>

            <div className="li-card-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="li-tag">{tag}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      <style>{`
        .li { width: 100%; }

        .li-heading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 28px;
          color: #f0fdf4;
          letter-spacing: -0.5px;
        }

        .li-heading .highlight {
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .li-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .li-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .li-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .li-card-logo {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(10, 102, 194, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .li-card-arrow {
          color: rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
        }

        .li-card:hover .li-card-arrow {
          color: #0A66C2;
          transform: translate(2px, -2px);
        }

        .li-card-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #f0fdf4;
          line-height: 1.3;
        }

        .li-card-excerpt {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          flex: 1;
        }

        .li-card-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .li-tag {
          padding: 3px 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .li-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
