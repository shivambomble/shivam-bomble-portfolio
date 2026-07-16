import { useRef, useEffect, useMemo, useCallback, useState } from "react";

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const AUTOROTATE_SPEED = 0.004;
const DRAG_SENSITIVITY = 0.006;
const DAMPING = 0.94;
const SMOOTHING = 0.08; // exponential moving average factor for opacity transitions

const categoryColors = {
  Languages: "#50fa7b",
  "Frameworks & Tools": "#8be9fd",
  "AI & Machine Learning": "#ff79c6",
  "Cloud & DevOps": "#f1fa8c",
  "Data Engineering": "#ffb86c",
  "Data Visualization": "#bd93f9",
};

function computePositions(count, radius) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = 2 * Math.PI * i / GOLDEN_RATIO;
    positions.push({
      x: radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(theta),
    });
  }
  return positions;
}

export default function SkillCloud({ skills }) {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const hoveredIndexRef = useRef(-1);
  const selectedIndexRef = useRef(-1);
  const radiusRef = useRef(220);



  // Build flat tag list from skills data
  const allTags = useMemo(() => {
    const tags = [];
    Object.entries(skills).forEach(([category, skillList]) => {
      skillList.forEach((skill) => {
        tags.push({
          name: skill,
          category,
          color: categoryColors[category] || "#d97706",
        });
      });
    });
    return tags;
  }, [skills]);

  // Compute & update positions on mount, resize, or skill count change
  const [positions, setPositions] = useState(() => computePositions(allTags.length, 220));
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const r = Math.min(220, w * 0.42);
      radiusRef.current = r;
      setPositions(computePositions(allTags.length, r));
    };
    updatePositions();
    const ro = new ResizeObserver(updatePositions);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [allTags.length]);

  // Animation loop — only depends on positions (stable reference)
  useEffect(() => {
    const elements = elementsRef.current;
    if (elements.length === 0) return;
    let running = true;

    function animate() {
      if (!running) return;

      const rot = rotationRef.current;
      const vel = velocityRef.current;
      const radius = radiusRef.current;

      if (!isDraggingRef.current) {
        rot.y += AUTOROTATE_SPEED;
        vel.x *= DAMPING;
        vel.y *= DAMPING;
        rot.x += vel.x;
        rot.y += vel.y;
      }

      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);

      positions.forEach((pos, i) => {
        const el = elements[i];
        if (!el) return;

        // Rotate around Y then X
        const x1 = pos.x * cosY - pos.z * sinY;
        const z1 = pos.x * sinY + pos.z * cosY;
        const y2 = pos.y * cosX - z1 * sinX;
        const z2 = pos.y * sinX + z1 * cosX;

        const perspective = 500;
        const scale = perspective / (perspective + z2);
        const depthRatio = (z2 + radius) / (2 * radius);
        const depthOpacity = 0.25 + 0.75 * depthRatio;
        const zIndex = Math.round(z2 + radius);

        const tag = allTags[i];
        const isHovered = hoveredIndexRef.current === i;
        const isSelected = selectedIndexRef.current === i;

        const targetOpacity = depthOpacity;
        const currentOpacity = parseFloat(el.dataset.currentOpacity) || targetOpacity;
        const newOpacity = currentOpacity + (targetOpacity - currentOpacity) * SMOOTHING;
        el.dataset.currentOpacity = newOpacity;

        el.style.transform = `translate(-50%, -50%) translate3d(${x1}px, ${y2}px, ${z2}px) scale(${scale})`;
        el.style.opacity = newOpacity;
        el.style.pointerEvents = "auto";
        el.style.zIndex = zIndex;
        el.style.display = "flex";

        const baseSize = 0.8 + 0.35 * depthRatio;
        el.style.fontSize = `${baseSize * (isHovered || isSelected ? 1.25 : 1)}rem`;
        el.style.borderWidth = isHovered || isSelected ? "2px" : "1px";
        el.style.boxShadow = isHovered
          ? `0 0 24px ${tag?.color}50, 0 0 48px ${tag?.color}20`
          : isSelected
          ? `0 0 12px ${tag?.color}30`
          : "none";
        el.style.background = isSelected || isHovered
          ? `${tag?.color}15`
          : `${tag?.color}06`;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [positions, allTags]);

  // Debounced hover detection — runs only when not dragging
  const handleContainerPointerMove = useCallback((e) => {
    if (isDraggingRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = e.clientX - cx;
    const py = e.clientY - cy;

    const rot = rotationRef.current;
    const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x);
    const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y);

    let closest = -1;
    let minDist = 50;

    positions.forEach((pos, i) => {
      const x1 = pos.x * cosY - pos.z * sinY;
      const z1 = pos.x * sinY + pos.z * cosY;
      const y2 = pos.y * cosX - z1 * sinX;
      const dist = Math.hypot(x1 - px, y2 - py);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    hoveredIndexRef.current = closest;
    if (containerRef.current) {
      containerRef.current.style.cursor = closest >= 0 ? "pointer" : "grab";
    }
  }, [positions]);

  // Pointer handlers
  const handlePointerDown = useCallback((e) => {
    // Don't start drag on tag click
    if (hoveredIndexRef.current >= 0) return;
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      rotationRef.current.y += dx * DRAG_SENSITIVITY;
      rotationRef.current.x += dy * DRAG_SENSITIVITY;
      velocityRef.current = { x: dy * DRAG_SENSITIVITY, y: dx * DRAG_SENSITIVITY };
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTagClick = useCallback((index) => {
    selectedIndexRef.current = selectedIndexRef.current === index ? -1 : index;
  }, []);

  return (
    <div
      ref={containerRef}
      className="skill-cloud-container"
      onPointerDown={handlePointerDown}
      onPointerMove={(e) => {
        handleContainerPointerMove(e);
        handlePointerMove(e);
      }}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        hoveredIndexRef.current = -1;
      }}
    >
      <div className="skill-cloud-ring" />
      <div className="skill-cloud-center" />

      <div className="skill-cloud-stage">
        {allTags.map((tag, i) => (
          <div
            key={tag.name}
            ref={(el) => { elementsRef.current[i] = el; }}
            className="skill-cloud-tag"
            style={{ "--tag-color": tag.color }}
            onClick={() => handleTagClick(i)}
          >
            {tag.name}
          </div>
        ))}
      </div>

      <div className="skill-cloud-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
        <span>Drag to explore</span>
      </div>

      <style>{`
        .skill-cloud-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 520px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: none;
          user-select: none;
          cursor: grab;
        }

        .skill-cloud-container:active {
          cursor: grabbing;
        }

        .skill-cloud-ring {
          position: absolute;
          width: min(420px, 85%);
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.04);
          background: radial-gradient(circle, rgba(217, 119, 6, 0.03) 0%, transparent 70%);
          pointer-events: none;
          animation: ringPulse 4s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .skill-cloud-center {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(217, 119, 6, 0.2);
          pointer-events: none;
        }

        .skill-cloud-stage {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          perspective: 800px;
        }

        .skill-cloud-tag {
          position: absolute;
          left: 50%;
          top: 50%;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          border: 1px solid var(--tag-color, #d97706);
          color: var(--tag-color, #d97706);
          background: rgba(255, 255, 255, 0.03);
          cursor: pointer;
          will-change: transform, opacity;
          backface-visibility: hidden;
          transition: font-size 0.3s ease, border-width 0.3s ease, box-shadow 0.3s ease;
          pointer-events: auto;
        }

        .skill-cloud-tag:hover {
          background: rgba(255, 255, 255, 0.06) !important;
        }

        .skill-cloud-hint {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.2);
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          pointer-events: none;
          animation: hintFade 3s ease-in-out infinite;
        }

        @keyframes hintFade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 640px) {
          .skill-cloud-container {
            height: 380px;
          }
          .skill-cloud-tag {
            font-size: 0.7rem;
            padding: 4px 10px;
          }
        }
      `}</style>
    </div>
  );
}
