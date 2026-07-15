import { useState, useEffect } from "react";

function ProjectCard({ repo }) {
  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Jupyter: "#DA5B0B",
    Rust: "#dea584",
    Go: "#00ADD8",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
  };

  const color = languageColors[repo.language] || "#8b5cf6";

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card glass-card"
    >
      <div className="project-header">
        <div className="project-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3 className="project-name">{repo.name}</h3>
      </div>

      <p className="project-description">
        {repo.description || "No description available"}
      </p>

      <div className="project-footer">
        {repo.language && (
          <span className="project-language">
            <span className="lang-dot" style={{ background: color }}></span>
            {repo.language}
          </span>
        )}
        <span className="project-stars">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {repo.stargazers_count}
        </span>
        <span className="project-forks">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          {repo.forks_count}
        </span>
      </div>
    </a>
  );
}

const repoDescriptions = {
  "Interview-Rooms":
    "AI-powered campus interview management platform with real-time queue orchestration, smart notifications, and live dashboards for recruiters, placement cells, and students.",
  "org-eda-platform":
    "Multi-tenant data analysis platform with automated data cleaning workflows, real-time alerts, and collaborative project management using React, Hasura, Temporal, and PostgreSQL.",
  "talworkdaily":
    "Daily learning & practice repository covering TypeScript, Node.js, React, and full-stack development exercises and projects.",
  "Speech-Processing-and-Recognition":
    "Lab exercises and projects in speech processing, audio feature extraction, and recognition techniques using Python and Jupyter Notebooks.",
  "Davakhana.AI-Doctor-Receptionist-AI":
    "AI-powered healthcare receptionist for appointment management with voice assistant, NLP intent recognition, and conversational booking built with Node.js, React, and Groq LLM.",
  "Akasa-Data-Engineer-Interview-Task":
    "Production-ready ETL pipeline with analytics dashboard for processing customer and order data using Python, MySQL, Streamlit, and Plotly.",
  "agent-as-coder":
    "Autonomous AI agent that generates custom PDF parsers for bank statements using a self-correcting loop with Gemini LLM and pdfplumber.",
  "Stock-Data-Pipeline":
    "Dockerized stock data pipeline with Dagster orchestration for fetching, processing, and storing real-time market data from Alpha Vantage API into PostgreSQL.",
  "SustainaBOT":
    "AI-powered environmental intelligence platform with RAG, real-time web search, and Streamlit dashboard providing sustainability insights and climate data analysis.",
  "Smart-Inventory-Expiry-Tracker-Using-AWS":
    "Serverless AWS solution for automated expiry tracking of food/beauty products using OCR extraction from product images with email reminders.",
  "Automated-Receipt-Processing-Using-AWS":
    "Automated receipt data extraction system using AWS Textract, Lambda, and DynamoDB for scalable document processing.",
  "Pizza_Restaurant_ChatBot_llama3.2":
    "Pizza restaurant ordering chatbot powered by Llama 3.2 with RAG and local Ollama deployment for natural language order management.",
  "NeuroBrush-Style-Transfer-Frontend":
    "Image style transfer web application built with React, Vite, and Tailwind CSS that applies artistic styles to user-uploaded images.",
  "NeuroBrush-Style-Transfer-Backend":
    "Django REST API backend for neural style transfer using deep learning models to apply artistic styles to images.",
  "NLP-MSAIM":
    "Natural Language Processing practical labs and assignments covering text processing, embeddings, and ML models for the MSc AI/ML program.",
  "Java-2024":
    "Java programming course projects and assignments covering OOP, data structures, and application development at Christ University.",
  "Data-Science-Basic":
    "Foundational data science practice notebooks covering pandas, numpy, visualization, and statistical analysis techniques.",
};

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/shivambomble/repos?sort=updated&per_page=8"
        );
        if (!response.ok) throw new Error("Failed to fetch repos");
        const data = await response.json();
        // Merge descriptions from our map for repos that lack them
        const enriched = data.map((repo) => ({
          ...repo,
          description: repo.description || repoDescriptions[repo.name] || "No description available",
        }));
        setRepos(enriched);
      } catch (err) {
        setError(err.message);
        // Fallback with real projects from GitHub
        setRepos([
          {
            id: 1,
            name: "Interview-Rooms",
            description: repoDescriptions["Interview-Rooms"],
            html_url: "https://github.com/shivambomble/Interview-Rooms",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
          },
          {
            id: 2,
            name: "org-eda-platform",
            description: repoDescriptions["org-eda-platform"],
            html_url: "https://github.com/shivambomble/org-eda-platform",
            language: "TypeScript",
            stargazers_count: 0,
            forks_count: 0,
          },
          {
            id: 3,
            name: "Davakhana.AI-Doctor-Receptionist-AI",
            description: repoDescriptions["Davakhana.AI-Doctor-Receptionist-AI"],
            html_url: "https://github.com/shivambomble/Davakhana.AI-Doctor-Receptionist-AI",
            language: "JavaScript",
            stargazers_count: 1,
            forks_count: 0,
          },
          {
            id: 4,
            name: "Akasa-Data-Engineer-Interview-Task",
            description: repoDescriptions["Akasa-Data-Engineer-Interview-Task"],
            html_url: "https://github.com/shivambomble/Akasa-Data-Engineer-Interview-Task",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
          },
          {
            id: 5,
            name: "SustainaBOT",
            description: repoDescriptions["SustainaBOT"],
            html_url: "https://github.com/shivambomble/SustainaBOT",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
          },
          {
            id: 6,
            name: "Stock-Data-Pipeline",
            description: repoDescriptions["Stock-Data-Pipeline"],
            html_url: "https://github.com/shivambomble/Stock-Data-Pipeline",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
          },
          {
            id: 7,
            name: "Smart-Inventory-Expiry-Tracker-Using-AWS",
            description: repoDescriptions["Smart-Inventory-Expiry-Tracker-Using-AWS"],
            html_url: "https://github.com/shivambomble/Smart-Inventory-Expiry-Tracker-Using-AWS",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
          },
          {
            id: 8,
            name: "agent-as-coder",
            description: repoDescriptions["agent-as-coder"],
            html_url: "https://github.com/shivambomble/agent-as-coder",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="orb orb-3" style={{ width: "300px", height: "300px", background: "#ea580c", top: "20%", left: "10%" }}></div>

      <div className="section-container">
        <h2 className="section-title">
          <span className="highlight">Projects</span>
        </h2>

        <a
          href="https://github.com/shivambomble"
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-link"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View all on GitHub
        </a>

        {loading ? (
          <div className="projects-loading">
            <div className="loader"></div>
            <p>Fetching latest projects...</p>
          </div>
        ) : (
          <div className="projects-grid">
            {repos.map((repo) => (
              <ProjectCard key={repo.id || repo.name} repo={repo} />
            ))}
          </div>
        )}

        {error && (
          <p className="projects-note">
            Showing sample projects. GitHub API rate limit hit.{" "}
            <a href="https://github.com/shivambomble" target="_blank" rel="noopener noreferrer">
              View all on GitHub →
            </a>
          </p>
        )}
      </div>

      <style>{`
        .project-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }

        .project-card:hover {
          transform: translateY(-8px) scale(1.015) !important;
        }

        .project-card:hover .project-icon {
          animation: iconBounce 0.5s ease;
        }

        @keyframes iconBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(-5deg); }
        }

        .github-profile-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 40px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .github-profile-link:hover {
          color: #fff;
          gap: 12px;
        }

        .projects-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: rgba(255, 255, 255, 0.4);
          padding: 60px 0;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.05);
          border-top: 3px solid #d97706;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .project-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .project-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.15), rgba(146, 64, 14, 0.15));
          color: #d97706;
          flex-shrink: 0;
        }

        .project-name {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          word-break: break-word;
        }

        .project-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
          flex: 1;
        }

        .project-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .project-language {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .lang-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .project-stars,
        .project-forks {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .projects-note {
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          margin-top: 24px;
        }

        .projects-note a {
          color: #d97706;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
