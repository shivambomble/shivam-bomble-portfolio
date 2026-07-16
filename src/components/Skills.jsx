import { motion } from "framer-motion";
import { skills } from "../data/portfolioData";
import AnimatedSection from "./AnimatedSection";
import SkillCloud from "./SkillCloud";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="section">
      <div className="orb orb-2" style={{ width: "350px", height: "350px", background: "#d97706", top: "30%", right: "-5%" }} />

      <div className="section-container">
        <motion.div
          className="section-header-wrapper"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="highlight">Skills</span>
          </h2>
          <p className="section-description">
            Technologies and tools I work with — drag the cloud to explore
          </p>
        </motion.div>

        <motion.div
          className="cloud-wrapper"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <SkillCloud skills={skills} />
        </motion.div>
      </div>

      <style>{`
        .section-header-wrapper {
          text-align: center;
          margin-bottom: 12px;
        }

        .section-description {
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.95rem;
          margin-top: 8px;
        }

        .cloud-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
        }

        @media (max-width: 640px) {
          .section-description {
            font-size: 0.85rem;
          }

          .cloud-wrapper {
            padding: 0;
          }
        }
      `}</style>
    </AnimatedSection>
  );
}
