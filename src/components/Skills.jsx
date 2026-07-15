import { skills, skillCategories } from "../data/portfolioData";
import { useState, useEffect, useRef } from "react";

// Tech icon SVGs for each skill
const skillIcons = {
  Python: "M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.539 5.891 7.539 5.891l.01 2.82h4.472v.845H6.22S2.798 9.5 2.798 14.21c0 4.709 3.164 4.55 3.164 4.55h1.914v-2.19s-.103-2.627 2.709-2.878zm-.111-5.857a.817.817 0 1 1 0-1.634.817.817 0 0 1 0 1.634zM14.415 12.308h-4.328s-2.432-.039-2.432 2.35v3.951S7.286 21 12.064 21c4.574 0 4.397-2.891 4.397-2.891l-.01-2.82h-4.472v-.845h5.801s3.422.236 3.422-4.551c0-4.709-3.164-4.55-3.164-4.55h-1.914v2.19s.103 2.627-2.709 2.878zm.111 5.857a.817.817 0 1 1 0 1.634.817.817 0 0 1 0-1.634z",
  TypeScript: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.534v2.487a4.745 4.745 0 0 0-.775-.495 5.07 5.07 0 0 0-1.126-.396c-.43-.11-.873-.164-1.328-.164-.335 0-.647.042-.937.126a1.76 1.76 0 0 0-.733.37c-.19.16-.281.36-.281.6 0 .21.05.373.148.488.099.115.221.2.368.256.147.056.349.121.607.195l.904.271c.772.231 1.359.555 1.76.972.401.417.601.963.601 1.638 0 .544-.143 1.042-.428 1.493-.285.452-.703.812-1.253 1.082-.55.27-1.225.405-2.025.405-.946 0-1.752-.148-2.418-.443a5.7 5.7 0 0 1-1.566-1.107v-2.808a3.692 3.692 0 0 1 .697.503c.242.221.536.421.853.6.333.2.709.359 1.128.479.419.12.825.18 1.219.18.654 0 1.148-.12 1.48-.36.333-.24.5-.56.5-.96 0-.239-.066-.44-.198-.6a1.341 1.341 0 0 0-.519-.396 4.86 4.86 0 0 0-.729-.31l-.855-.27a5.624 5.624 0 0 1-1.548-.75 3.394 3.394 0 0 1-.977-1.148 3.48 3.48 0 0 1-.348-1.57c0-.566.136-1.067.41-1.503.273-.436.65-.806 1.131-1.109.48-.303 1.062-.528 1.744-.675.682-.148 1.417-.222 2.205-.222zm-8.18 5.352v1.968c.19.106.464.188.82.244.355.057.687.085.995.085.42 0 .802-.044 1.147-.133.344-.089.637-.222.877-.4.24-.177.413-.396.519-.656.106-.26.159-.558.159-.894 0-.542-.191-.925-.574-1.15-.383-.225-1.11-.386-2.181-.482-.443-.04-.786-.107-1.028-.202-.242-.095-.415-.223-.519-.385-.104-.162-.156-.365-.156-.609 0-.3.107-.533.322-.7.215-.167.477-.251.786-.251.351 0 .685.06 1.002.178.317.12.613.267.888.44v-1.744a4.34 4.34 0 0 0-.796-.275 5.38 5.38 0 0 0-1.064-.119c-.842 0-1.508.24-1.998.718-.49.479-.735 1.107-.735 1.885 0 .462.105.847.314 1.155.21.308.495.553.856.736.36.183.79.316 1.289.398.5.082.824.163.973.244.148.08.222.199.222.356 0 .269-.115.471-.346.607-.23.136-.596.204-1.097.204-.356 0-.722-.051-1.099-.154-.377-.102-.726-.26-1.048-.474z",
  JavaScript: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-.946-2.534-.885-1.215.074-2.011.556-2.535 1.41-.465.81-.334 1.995.154 2.733.585.885 1.575 1.26 2.805 1.575 1.17.3 1.395.525 1.475.885.09.525-.015.825-.525 1.155-.66.42-1.494.45-2.231.21-.555-.18-.915-.54-1.22-1.104-.99.555-.99.555-1.74 1.065.244.468.614.895 1.02 1.205 1.29.975 3.25.885 4.246.385.675-.33 1.095-.81 1.245-1.455.15-.645-.03-1.35-.315-1.77-.404-.6-1.2-1.02-2.475-1.35-.855-.225-1.185-.345-1.38-.555-.195-.225-.285-.48-.225-.735.06-.39.345-.6.84-.66.735-.09 1.46.165 1.89.585.165.165.315.36.495.66.99-.555 1.665-1.065 1.665-1.065-.57-.99-1.485-1.455-2.97-1.455-2.385 0-3.705 1.62-3.705 3.44 0 2.115 1.245 3.36 2.835 3.96 1.995.75 2.475.99 2.475 1.59 0 .705-.675 1.065-1.74 1.065-1.08 0-1.83-.42-2.31-1.275-.99.585-1.395.99-1.395.99.27.615.69 1.155 1.275 1.575 1.275.81 3.645.563 4.68-.278.825-.666 1.185-1.695 1.005-2.97-.066-.84-.465-1.395-1.29-1.875z",
  SQL: "M10.057 16.252H7.87v-2.306H4.09v2.306H1.903V8.545h2.187v5.157h3.78V8.545h2.187v7.707zm7.856 0H12.47V8.545h5.443v1.957h-3.256v1.422h2.955v1.915h-2.955v1.456h3.256v1.957z",
  "HTML/CSS": "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z",
  "React.js": "M12 10.11c1.044 0 1.89.846 1.89 1.89s-.846 1.89-1.89 1.89-1.89-.846-1.89-1.89.846-1.89 1.89-1.89m0 7.8c3.072 0 6.066-.45 8.334-1.2.756-.252 1.47-.582 2.04-.99.564-.408.96-.918 1.086-1.5.126-.582-.03-1.236-.474-1.818-.438-.582-1.086-1.128-1.86-1.542-.768-.414-1.65-.738-2.634-.984C18.438 9.63 18.2 8.7 17.83 7.87c.486-.828.852-1.758 1.05-2.712.198-.954.228-1.932.066-2.838-.162-.906-.498-1.71-1.02-2.292-.522-.582-1.194-.882-1.962-.882-.768 0-1.656.312-2.688.78-1.032.468-2.178 1.11-3.3 1.908-1.122-.798-2.268-1.44-3.3-1.908-1.032-.468-1.92-.78-2.688-.78-.768 0-1.44.3-1.962.882-.522.582-.858 1.386-1.02 2.292-.162.906-.132 1.884.066 2.838.198.954.564 1.884 1.05 2.712.37.828.608 1.758.756 2.688-.984.246-1.866.57-2.634.984-.774.414-1.434.96-1.86 1.542-.444.582-.6 1.236-.474 1.818.126.582.522 1.092 1.086 1.5.57.408 1.284.738 2.04.99 2.268.75 5.262 1.2 8.334 1.2",
  "Node.js": "M11.435.153l-9.37 5.43c-.09.053-.145.153-.145.256v11.988c0 .2.238.33.383.232l9.194-5.232c.228-.13.394-.402.394-.66V.385c0-.2-.238-.33-.383-.232M21.935.153l-3.11 1.802c-.09.053-.145.153-.145.256v6.222c0 .2.238.33.383.232l3.296-1.874c.228-.13.394-.402.394-.66V.385c0-.2-.238-.33-.383-.232",
  FastAPI: "M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.374-12-12-12zm3.6 13.388H12.8l-1.6 5.987L15.6 13.388zm-6.4-2.776h2.8l1.6-5.987L9.2 10.612z",
  "GraphQL (Hasura)": "M12.002 0a2.138 2.138 0 1 0 .004 4.277 2.138 2.138 0 0 0-.004-4.277zm8.54 4.931a2.138 2.138 0 1 0 .004 4.277 2.138 2.138 0 0 0-.004-4.277zm0 9.862a2.138 2.138 0 1 0 .004 4.277 2.138 2.138 0 0 0-.004-4.277zm-8.54 4.931a2.138 2.138 0 1 0 .004 4.277 2.138 2.138 0 0 0-.004-4.277zm-8.54-4.862a2.138 2.138 0 1 0 .004 4.277 2.138 2.138 0 0 0-.004-4.277zm0-9.962a2.138 2.138 0 1 0 .004 4.277 2.138 2.138 0 0 0-.004-4.277z",
  Docker: "M13.983 11.078h-2.25v2.25h2.25v-2.25zm0-3.375h-2.25v2.25h2.25v-2.25zm3.375 0h-2.25v2.25h2.25v-2.25zm3.375 0h-2.25v2.25h2.25v-2.25zm-6.75-3.375h-2.25v2.25h2.25v-2.25zM10.608 7.703h-2.25v2.25h2.25v-2.25zm0-3.375h-2.25v2.25h2.25v-2.25zm-3.375 3.375h-2.25v2.25h2.25v-2.25zm13.5 3.375c.15-.75.15-1.5-.15-2.25 0 0-.75-.375-2.25-.375-1.5 0-2.625.375-3.375 1.125-.75-.75-1.875-1.125-3.375-1.125-1.875 0-3.375.75-3.75 2.25-.75 0-2.25 0-3.375-.75 0 0-1.875 1.875-.75 4.5 0 0 .375 1.5 1.5 2.625 0 0 1.125 1.5 4.125 1.5h9.375c.375 0 1.125 0 1.5-.375 0 0 .375-.375.375-1.125s0-3.375.375-4.5 0-1.5-.375-2.25z",
  PyTorch: "M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 13.92 9.865 9.865 0 0 0 13.92 0 9.865 9.865 0 0 0 0-13.92l-1.737 1.738a7.44 7.44 0 0 1 0 10.488 7.44 7.44 0 0 1-10.488 0 7.44 7.44 0 0 1 0-10.488L12.005 0z",
  TensorFlow: "M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564-1.985-5.31m21.449 5.311l-1.985-5.31-4.248 2.453L12.883 12 10.13 7.902l-.01 5.364 4.246 4.989v2.445l-2.824-1.461-.011 3.034 2.835 1.633 4.248-2.378v-7.274l3.088-1.788",
  "Scikit-learn": "M22.02 19.18a3.46 3.46 0 0 0-3.46 3.46 3.46 3.46 0 0 0 3.46 3.46 3.46 3.46 0 0 0 3.46-3.46 3.46 3.46 0 0 0-3.46-3.46M11.19 13.5a3.46 3.46 0 0 0-3.46 3.46 3.46 3.46 0 0 0 3.46 3.46 3.46 3.46 0 0 0 3.46-3.46 3.46 3.46 0 0 0-3.46-3.46M4.54 7.85a3.46 3.46 0 0 0-3.46 3.46 3.46 3.46 0 0 0 3.46 3.46 3.46 3.46 0 0 0 3.46-3.46 3.46 3.46 0 0 0-3.46-3.46",
  Langfuse: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-6h2v6zm4 0h-2V9h2v8z",
  NLP: "M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z",
  RAG: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  "AWS (S3/Lambda/DynamoDB)": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.99 14.86c-.04.11-.14.18-.25.18s-.21-.07-.25-.18l-.96-2.95h-3.06l-.96 2.95c-.04.11-.14.18-.25.18s-.21-.07-.25-.18l-.96-2.95H8.38l-1.12 3.07c-.05.14-.19.23-.34.21-.15-.01-.27-.12-.29-.27l-1.05-7.32c0-.02 0-.04.01-.06v-.02c0-.01.01-.02.01-.03.06-.46.46-.8.93-.8h7.2c.34 0 .64.18.8.47l2.33 4.68 2.33-4.68c.16-.29.46-.47.8-.47h1.44c.55 0 1 .45 1 1 0 .05-.01.1-.02.15l-1.05 7.32c-.02.15-.14.26-.29.27-.15.02-.29-.07-.34-.21l-1.12-3.07H16.3l-.96 2.95z",
  Git: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.265.432 1.908l2.66 2.66c.645-.228 1.387-.086 1.903.429a1.51 1.51 0 0 1-1.348 2.555c-.423.119-.893-.012-1.225-.343a1.556 1.556 0 0 1-.395-1.538l-2.483-2.483-.001 6.536c.326.16.588.418.829.66.645.645.645 1.695 0 2.34-.645.644-1.695.644-2.34 0-.645-.645-.645-1.695 0-2.34.214-.215.475-.386.758-.498V9.996a1.746 1.746 0 0 1-.758-.498c-.472-.473-.627-1.149-.441-1.73l-2.722-2.722L.452 10.88c-.603.603-.604 1.582 0 2.187l10.48 10.48c.603.603 1.581.603 2.184 0l10.43-10.43c.603-.605.603-1.584 0-2.187",
  Supabase: "M11.9 22.16c-.32 0-.54-.28-.46-.58l1.6-6.06H7.6c-.38 0-.62-.4-.44-.73L13.7 1.9c.12-.22.38-.3.6-.22.22.08.36.3.36.54v6.85h3.15c.36 0 .56.36.44.68l-6.05 12.07c-.1.2-.3.34-.5.34z",
  Pandas: "M0 2h4v20H0V2zm6 0h4v12H6V2zm6 0h4v8h-4V2zm6 0h4v16h-4V2z",
  NumPy: "M10.315 3.22l4.563 2.654-2.772 4.765L7.54 7.984l2.774-4.765zM22.232 3.22L17.67 5.874l-2.743-2.674 4.563-2.654-2.74 4.765 2.75 4.766 2.732-4.766-2.78-4.793zM7.773 18.02l2.744 2.673-4.563 2.654 2.772-4.765 2.772 4.765 4.563-2.654-2.772-4.765-4.563 2.654 2.772 4.765-2.772-4.765z",
  "ETL Pipelines": "M4 15v3c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4v-3H4zm16-2v-3c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4v3h16zM7 9l5 5 5-5H7z",
  "Label Studio": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  "Power BI": "M10 3H5c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm9 0h-5c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm0 12h-5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1z",
  Tableau: "M11.654 0v4.094h4.095V0h-4.095zm5.871 0v4.094h4.094V0h-4.094zM11.654 5.953v4.094h4.095V5.953h-4.095zm5.871 0v4.094h4.094V5.953h-4.094zM0 5.953v4.094h4.094V5.953H0zm5.953 0v4.094h4.094V5.953H5.953zm5.701 5.954v4.094h4.095v-4.094h-4.095zm5.871 0v4.094h4.094v-4.094h-4.094zM0 11.907v4.094h4.094v-4.094H0zm5.953 0v4.094h4.094v-4.094H5.953z",
  Matplotlib: "M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h8v2H7v-2zm0 4h6v2H7v-2z",
  Plotly: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  "Geospatial Mapping": "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
};

function SkillTag({ name, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const path = skillIcons[name];

  return (
    <span
      ref={ref}
      className={`skill-tag ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      {path && (
        <svg className="skill-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d={path} />
        </svg>
      )}
      <span className="skill-label">{name}</span>
    </span>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skillCategories.reduce((acc, cat) => {
          acc[cat] = skills[cat];
          return acc;
        }, {})
      : { [activeCategory]: skills[activeCategory] };

  let globalIndex = 0;

  return (
    <section id="skills" className="section">
      <div className="orb orb-2" style={{ width: "350px", height: "350px", background: "#d97706", top: "30%", right: "-5%" }}></div>

      <div className="section-container">
        <h2 className="section-title">
          <span className="highlight">Skills</span>
        </h2>

        <div className="skills-filter">
          <button
            className={`filter-btn ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-categories">
          {Object.entries(filteredSkills).map(([category, skillList]) => {
            const catIndex = globalIndex;
            globalIndex += skillList.length;
            return (
              <div key={category} className="skill-category">
                <div className="skill-category-header">
                  <span className="skill-category-line"></span>
                  <h3 className="skill-category-title">{category}</h3>
                </div>
                <div className="skill-tags">
                  {skillList.map((skill, i) => (
                    <SkillTag key={skill} name={skill} index={catIndex + i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .skill-category {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }

        .skill-category:hover {
          transform: translateY(-4px) scale(1.008) !important;
          box-shadow: 0 12px 40px rgba(217, 119, 6, 0.08) !important;
        }

        .filter-btn {
          position: relative;
          overflow: hidden;
        }

        .filter-btn::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #d97706, #ea580c);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .filter-btn.active::after {
          width: 60%;
        }

        .skill-tag {
          position: relative;
          overflow: hidden;
        }

        .skill-tag::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0s;
        }

        .skill-tag:hover::before {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }

        .skills-filter {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 48px;
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .filter-btn:hover {
          border-color: rgba(217, 119, 6, 0.3);
          color: #fff;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(146, 64, 14, 0.2));
          border-color: rgba(217, 119, 6, 0.4);
          color: #fff;
        }

        .skills-categories {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 800px;
          margin: 0 auto;
        }

        .skill-category {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px 28px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-category::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.3), rgba(146, 64, 14, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .skill-category:hover::before {
          opacity: 1;
        }

        .skill-category:hover {
          border-color: rgba(217, 119, 6, 0.15);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(217, 119, 6, 0.06);
        }

        .skill-category-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .skill-category-line {
          width: 3px;
          height: 18px;
          background: linear-gradient(180deg, #d97706, #92400e);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .skill-category-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
          opacity: 0;
          transform: translateY(12px) scale(0.95);
        }

        .skill-tag.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .skill-tag:hover {
          color: #fff;
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.15), rgba(146, 64, 14, 0.12));
          border-color: rgba(217, 119, 6, 0.3);
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.15);
        }

        .skill-tag:hover .skill-icon {
          transform: scale(1.2) rotate(-5deg);
        }

        .skill-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: #d97706;
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .skill-tag:hover .skill-icon {
          color: #fff;
        }

        .skill-label {
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .skill-category {
            padding: 20px;
          }

          .skill-tag {
            font-size: 0.8rem;
            padding: 6px 12px;
            gap: 6px;
          }

          .skill-icon {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </section>
  );
}
