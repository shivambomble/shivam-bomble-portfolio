import { motion } from "framer-motion";

const footerLinkVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { href: "#home", label: "Home" },
    { href: "#education", label: "Education" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="footer-brand"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.span
              className="footer-logo gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              SB
            </motion.span>
            <p className="footer-tagline">
              Building the future with AI and code.
            </p>
          </motion.div>
          <nav className="footer-nav">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="footer-link"
                custom={i}
                variants={footerLinkVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -2, color: "#fff", backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ y: 0, scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.p
            className="footer-copyright"
            whileHover={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            &copy; {year} Shivam Bomble. Crafted with passion.
          </motion.p>
          <motion.p
            className="footer-built-with"
            whileHover={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Hasta la vista
          </motion.p>
        </motion.div>
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
          margin-bottom: 32px;
          flex-wrap: wrap;
          position: relative;
        }

        .footer-top::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.2), rgba(234, 88, 12, 0.2), transparent);
          background-size: 200% 100%;
          animation: shimmerSlide 3s ease-in-out infinite;
        }

        .footer-logo {
          font-size: 2rem;
          font-weight: 800;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          margin-top: 8px;
          transition: color 0.3s ease;
        }

        .footer-brand:hover .footer-tagline {
          color: rgba(255, 255, 255, 0.6);
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
          position: relative;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #d97706, #ea580c);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateX(-50%);
        }

        .footer-link:hover::before {
          width: 50%;
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
