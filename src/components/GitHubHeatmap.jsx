import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const USERNAME = "shivambomble";
const COLORS_DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const COLORS_LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function GitHubHeatmap({ isDark = true }) {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setContributions(data.contributions || []);
      } catch {
        // Generate mock data as fallback
        const mock = [];
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          mock.push({
            date: d.toISOString().split("T")[0],
            count: Math.random() > 0.4 ? Math.floor(Math.random() * 12) : 0,
          });
        }
        setContributions(mock);
        setError("Using mock data");
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, [year]);

  const { weeks, total, maxCount, avgPerDay } = useMemo(() => {
    if (!contributions.length) return { weeks: [], total: 0, maxCount: 0, avgPerDay: 0 };

    const total = contributions.reduce((s, c) => s + c.count, 0);
    const maxCount = Math.max(...contributions.map((c) => c.count), 1);
    const avgPerDay = (total / contributions.length).toFixed(1);

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

    return { weeks, total, maxCount, avgPerDay };
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

  if (loading) {
    return (
      <div className="heatmap-container">
        <div className="heatmap-loading">
          <div className="heatmap-loader" />
          <span>Loading contributions...</span>
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
          <span className="heatmap-stat">{total.toLocaleString()} contributions this year</span>
        </div>
      </div>

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
                        ? `${day.count} contributions on ${day.date}`
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

      {error && (
        <div className="heatmap-error-banner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Could not load live data. Showing sample activity.</span>
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

        .heatmap-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          margin-top: 12px;
          padding: 8px 14px;
          border-radius: 6px;
          background: rgba(234, 179, 8, 0.06);
          border: 1px solid rgba(234, 179, 8, 0.12);
          color: rgba(234, 179, 8, 0.7);
          font-size: 0.75rem;
        }

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

        @media (max-width: 640px) {
          .heatmap-container { padding: 20px; }
          .heatmap-cell { width: 9px; height: 9px; }
        }
      `}</style>
    </motion.div>
  );
}
