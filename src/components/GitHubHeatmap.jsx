import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const USERNAME = "shivambomble";
const GITHUB_URL = `https://github.com/${USERNAME}`;
const API_URL = `https://api.github.com/users/${USERNAME}`;
const COLORS_DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const COLORS_LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Jupyter: "#da5b0b",
  "Jupyter Notebook": "#da5b0b",
  Shell: "#89e051",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00add8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Vue: "#41b883",
  Dart: "#00b4ab",
};

const languageColor = (lang) => LANG_COLORS[lang] || "#8b949e";

// Unauthenticated GitHub allows 60 requests/hour per IP, so cache the last good
// payload for the session instead of refetching on every mount.
const CACHE_KEY = "sb-gh-cache-v1";
const CACHE_TTL = 30 * 60 * 1000;

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || Date.now() - entry.at > CACHE_TTL) return null;
    return entry;
  } catch {
    return null;
  }
};

const writeCache = (payload) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), ...payload }));
  } catch {
    // Storage can be full or blocked; live data still renders for this visit.
  }
};

export default function GitHubHeatmap({ isDark = true }) {
  const [contributions, setContributions] = useState([]);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reposError, setReposError] = useState(null);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    let cancelled = false;

    const getJson = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        const err = new Error(`${res.status} ${url}`);
        err.status = res.status;
        throw err;
      }
      return res.json();
    };

    const apply = ({ contributions: contribs, profile: prof, repos: rep }) => {
      if (Array.isArray(contribs) && contribs.length) setContributions(contribs);
      else setError("Live contribution data is unavailable right now.");
      if (prof) setProfile(prof);
      if (Array.isArray(rep)) setRepos(rep.filter((repo) => !repo.fork));
    };

    const load = async () => {
      const cached = readCache();
      if (cached) {
        apply(cached);
        setLoading(false);
        return;
      }

      // Contributions controls the grid; profile/repos only enrich it, so a
      // failure in either of those must not blank the section.
      const [contribRes, profileRes, reposRes] = await Promise.allSettled([
        getJson(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`),
        getJson(API_URL),
        getJson(`${API_URL}/repos?sort=pushed&per_page=100`),
      ]);
      if (cancelled) return;

      const contribData = contribRes.status === "fulfilled" ? contribRes.value : null;
      const contribs = Array.isArray(contribData?.contributions) && contribData.contributions.length
        ? contribData.contributions
        : null;
      const prof = profileRes.status === "fulfilled" ? profileRes.value : null;
      const rep = reposRes.status === "fulfilled" && Array.isArray(reposRes.value)
        ? reposRes.value
        : null;

      apply({ contributions: contribs, profile: prof, repos: rep });

      if (!rep) {
        const status = reposRes.status === "rejected" ? reposRes.reason?.status : null;
        setReposError(
          status === 403 || status === 429
            ? "GitHub's public API rate limit was reached, so repository details are hidden."
            : "Repository details are unavailable right now."
        );
      }

      // Only cache a complete payload, otherwise a transient failure would be
      // served from cache for the rest of the session.
      if (contribs && prof && rep) writeCache({ contributions: contribs, profile: prof, repos: rep });

      setLoading(false);
    };

    load();
    return () => { cancelled = true; };
  }, [year]);

  const { weeks, total, maxCount } = useMemo(() => {
    if (!contributions.length) return { weeks: [], total: 0, maxCount: 0 };

    const total = contributions.reduce((s, c) => s + c.count, 0);
    const maxCount = Math.max(...contributions.map((c) => c.count), 1);

    // Build weeks grid
    const weeks = [];
    let currentWeek = [];
    const firstDate = new Date(contributions[0].date);
    const startDay = firstDate.getDay();

    // Pad start
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    contributions.forEach((c) => {
      currentWeek.push(c);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }

    return { weeks, total, maxCount };
  }, [contributions]);

  const getColor = (count) => {
    const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
    if (count === 0) return colors[0];
    const intensity = Math.min(count / Math.max(maxCount, 1), 1);
    if (intensity < 0.25) return colors[1];
    if (intensity < 0.5) return colors[2];
    if (intensity < 0.75) return colors[3];
    return colors[4];
  };

  // Month labels
  const monthPositions = useMemo(() => {
    if (!contributions.length) return [];
    const positions = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIdx) => {
      const firstDay = week.find((d) => d !== null);
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          positions.push({ month, x: weekIdx * 14 });
          lastMonth = month;
        }
      }
    });
    return positions;
  }, [weeks, contributions]);

  const topRepos = useMemo(
    () =>
      [...repos]
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.pushed_at) - new Date(a.pushed_at)
        )
        .slice(0, 4),
    [repos]
  );

  const { totalStars, languages } = useMemo(() => {
    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const byLang = new Map();
    repos.forEach((r) => {
      if (r.language) byLang.set(r.language, (byLang.get(r.language) || 0) + 1);
    });
    const langs = [...byLang.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
    return { totalStars: stars, languages: langs };
  }, [repos]);

  if (loading) {
    return (
      <div className="heatmap-container">
        <div className="heatmap-loading">
          <div className="heatmap-loader" />
          <span>Loading GitHub activity...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="heatmap-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="heatmap-header">
        <h3 className="heatmap-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub Activity
        </h3>
        <div className="heatmap-stats">
          <span className="heatmap-stat">
            {error ? "Live data unavailable" : `${total.toLocaleString()} contributions in ${year}`}
          </span>
        </div>
      </div>

      {error ? (
        <div className="heatmap-fallback">
          <p>{error}</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            View activity on GitHub →
          </a>
        </div>
      ) : (
        <>
          <div className="heatmap-scroll">
            {/* Month labels */}
            <div className="heatmap-months" style={{ marginLeft: 32 }}>
              {monthPositions.map(({ month, x }) => (
                <span key={month} className="heatmap-month-label" style={{ left: x }}>
                  {MONTHS[month]}
                </span>
              ))}
            </div>

            <div className="heatmap-grid">
              {/* Day labels */}
              <div className="heatmap-day-labels">
                {WEEK_DAYS.map((day, i) => (
                  <span key={day} className="heatmap-day-label" style={{ height: 13 }}>
                    {i % 2 === 1 ? day.slice(0, 2) : ""}
                  </span>
                ))}
              </div>

              {/* Grid */}
              <div className="heatmap-cells">
                {weeks.map((week, wi) => (
                  <div key={wi} className="heatmap-week">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        className="heatmap-cell"
                        style={{
                          backgroundColor: day ? getColor(day.count) : "transparent",
                        }}
                        title={
                          day
                            ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                            : ""
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="heatmap-legend">
            <span className="heatmap-legend-text">Less</span>
            {(isDark ? COLORS_DARK : COLORS_LIGHT).map((color, i) => (
              <div
                key={i}
                className="heatmap-legend-cell"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="heatmap-legend-text">More</span>
          </div>
        </>
      )}

      {repos.length === 0 && reposError && (
        <div className="gh-repos">
          <p className="gh-repos-fallback">
            {reposError}{" "}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Browse repositories →
            </a>
          </p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="gh-repos">
          <div className="gh-summary">
            {profile && (
              <>
                <div className="gh-metric">
                  <strong>{profile.public_repos.toLocaleString()}</strong>
                  <span>public repos</span>
                </div>
                <div className="gh-metric">
                  <strong>{profile.followers.toLocaleString()}</strong>
                  <span>followers</span>
                </div>
              </>
            )}
            {totalStars > 0 && (
              <div className="gh-metric">
                <strong>{totalStars.toLocaleString()}</strong>
                <span>stars earned</span>
              </div>
            )}
            <a
              className="gh-profile-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{USERNAME} →
            </a>
          </div>

          {languages.length > 0 && (
            <>
              <div className="gh-lang-bar">
                {languages.map((lang) => (
                  <span
                    key={lang.name}
                    style={{ flex: lang.count, background: languageColor(lang.name) }}
                    title={`${lang.name} · ${lang.count} repo${lang.count === 1 ? "" : "s"}`}
                  />
                ))}
              </div>
              <div className="gh-lang-legend">
                {languages.map((lang) => (
                  <span key={lang.name}>
                    <i style={{ background: languageColor(lang.name) }} />
                    {lang.name}
                  </span>
                ))}
              </div>
            </>
          )}

          <ul className="gh-repo-list">
            {topRepos.map((repo) => (
              <li key={repo.id} className="gh-repo">
                <a
                  className="gh-repo-name"
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                {repo.description && <p className="gh-repo-desc">{repo.description}</p>}
                <div className="gh-repo-meta">
                  {repo.language && (
                    <span className="gh-repo-lang">
                      <i style={{ background: languageColor(repo.language) }} />
                      {repo.language}
                    </span>
                  )}
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .heatmap-container {
          background: rgba(10, 15, 12, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 28px;
          max-width: 900px;
          margin: 0 auto;
        }

        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .heatmap-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .heatmap-stat {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .heatmap-scroll {
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .heatmap-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .heatmap-scroll::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 2px;
        }

        .heatmap-months {
          position: relative;
          height: 16px;
          margin-bottom: 4px;
        }

        .heatmap-month-label {
          position: absolute;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .heatmap-grid {
          display: flex;
          gap: 4px;
        }

        .heatmap-day-labels {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .heatmap-day-label {
          width: 28px;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
        }

        .heatmap-cells {
          display: flex;
          gap: 3px;
        }

        .heatmap-week {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .heatmap-cell {
          width: 11px;
          height: 11px;
          border-radius: 2px;
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .heatmap-cell:hover {
          outline: 2px solid rgba(16, 185, 129, 0.5);
          outline-offset: 1px;
          transform: scale(1.3);
        }

        .heatmap-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: flex-end;
          margin-top: 12px;
        }

        .heatmap-legend-text {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
          margin: 0 4px;
        }

        .heatmap-legend-cell {
          width: 11px;
          height: 11px;
          border-radius: 2px;
        }

        .heatmap-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 28px 0 20px;
          text-align: center;
        }

        .heatmap-fallback p {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.45);
        }

        .heatmap-fallback a {
          font-size: 0.8rem;
          color: #10b981;
          text-decoration: none;
        }

        .heatmap-fallback a:hover { text-decoration: underline; }

        .heatmap-loading {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          padding: 40px 0;
          justify-content: center;
        }

        .heatmap-loader {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.05);
          border-top-color: #10b981;
          border-radius: 50%;
          animation: heatmapSpin 0.8s linear infinite;
        }

        @keyframes heatmapSpin {
          to { transform: rotate(360deg); }
        }

        /* ═══ Repo + profile stats ═══ */
        .gh-repos {
          margin-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 18px;
        }

        .gh-summary {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .gh-metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .gh-metric strong {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0fdf4;
          font-variant-numeric: tabular-nums;
        }

        .gh-metric span {
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
        }

        .gh-profile-link {
          margin-left: auto;
          font-size: 0.75rem;
          color: #10b981;
          text-decoration: none;
        }

        .gh-profile-link:hover { text-decoration: underline; }

        .gh-lang-bar {
          display: flex;
          gap: 2px;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
        }

        .gh-lang-bar span { display: block; height: 100%; }

        .gh-lang-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin: 8px 0 18px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .gh-lang-legend span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .gh-lang-legend i,
        .gh-repo-lang i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .gh-repos-fallback {
          font-size: 0.78rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.45);
        }

        .gh-repos-fallback a {
          color: #10b981;
          text-decoration: none;
        }

        .gh-repos-fallback a:hover { text-decoration: underline; }

        .gh-repo-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 10px;
        }

        .gh-repo {
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.015);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .gh-repo:hover {
          border-color: rgba(16, 185, 129, 0.25);
          transform: translateY(-2px);
        }

        .gh-repo-name {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.82rem;
          color: #34d399;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .gh-repo-name:hover { color: #10b981; text-decoration: underline; }

        .gh-repo-desc {
          font-size: 0.75rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.4);
          margin: 6px 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .gh-repo-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.35);
        }

        .gh-repo-lang {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        @media (max-width: 640px) {
          .heatmap-container { padding: 20px; }
          .heatmap-cell { width: 9px; height: 9px; }
          .gh-summary { gap: 20px; }
          .gh-profile-link { margin-left: 0; }
        }
      `}</style>
    </motion.div>
  );
}
