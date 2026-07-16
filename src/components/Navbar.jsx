import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">          <motion.button
            className="navbar-logo"
            onClick={() => scrollToSection("#home")}
            aria-label="Go to top"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
          >
            <span className="logo-text gradient-text">SB</span>
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.ul
              key={mobileOpen ? "mobile" : "desktop"}
              className={`navbar-links ${mobileOpen ? "active" : ""}`}
              initial={mobileOpen ? { opacity: 0, y: -20 } : false}
              animate={mobileOpen ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={mobileOpen ? { opacity: 0, x: -20 } : false}
                  animate={mobileOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: mobileOpen ? i * 0.05 : 0 }}
                >
                  <motion.button
                    className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {item.label}
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <motion.button
            className={`hamburger ${mobileOpen ? "active" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="hamburger-line"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
            />
            <motion.span
              className="hamburger-line"
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="hamburger-line"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
            />
          </motion.button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 24px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .navbar-scrolled {
          background: rgba(10, 10, 15, 0.88);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 10px 24px;
          box-shadow: 0 1px 30px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .navbar-logo:hover {
          transform: scale(1.08) rotate(-3deg);
        }

        .navbar-logo:active {
          transform: scale(0.95) rotate(0deg);
        }

        .logo-text {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -1px;
          display: block;
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 8px;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 10px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          font-family: inherit;
          position: relative;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(146, 64, 14, 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .nav-link:hover {
          color: #fff;
          transform: translateY(-1px);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:active {
          transform: translateY(0) scale(0.97);
        }

        .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(146, 64, 14, 0.2));
          border: 1px solid rgba(217, 119, 6, 0.25);
          box-shadow: 0 0 20px rgba(217, 119, 6, 0.08);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .navbar-links {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(24px) saturate(1.4);
            padding: 24px;
            gap: 4px;
            transform: translateY(-120%);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }

          .navbar-links.active {
            transform: translateY(0);
            opacity: 1;
          }

          .nav-link {
            width: 100%;
            text-align: left;
            padding: 12px 16px;
            font-size: 1rem;
          }

          .hamburger-line {
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        }
      `}</style>
    </nav>
  );
}
