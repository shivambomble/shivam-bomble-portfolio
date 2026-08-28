import { useMemo } from "react";

function createShapes(count) {
  const shapes = [];
  const types = ["circle", "square", "line"];
  for (let i = 0; i < count; i++) {
    const type = types[i % 3];
    shapes.push({
      id: i,
      type,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 45 + 15,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * -30,
      xDrift: (Math.random() - 0.5) * 120,
      yDrift: (Math.random() - 0.5) * 80,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 60 + 40,
      opacity: Math.random() * 0.25 + 0.15,
    });
  }
  return shapes;
}

export default function BackgroundObjects() {
  const shapes = useMemo(() => createShapes(35), []);

  return (
    <div className="bg-objects" aria-hidden="true">
      {shapes.map((s) => (
        <div
          key={s.id}
          className={`bg-shape bg-shape--${s.type}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.type === "line" ? `${s.size * 1.5}px` : `${s.size}px`,
            height: s.type === "line" ? "2px" : `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s, ${s.rotSpeed}s`,
            animationDelay: `${s.delay}s, ${s.delay * 0.7}s`,
            "--x-drift": `${s.xDrift}px`,
            "--y-drift": `${s.yDrift}px`,
            "--rot": `${s.rotation}deg`,
          }}
        />
      ))}

      <style>{`
        .bg-objects {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .bg-shape {
          position: absolute;
          border-color: rgba(16, 185, 129, 0.5);
          border-style: solid;
          animation:
            bgFloat var(--dur, 30s) ease-in-out infinite,
            bgSpin var(--rot-dur, 50s) linear infinite;
        }

        .bg-shape--circle {
          border-radius: 50%;
          border-width: 2px;
          background: transparent;
        }

        .bg-shape--square {
          border-radius: 3px;
          border-width: 2px;
          background: transparent;
          transform: rotate(var(--rot, 0deg));
        }

        .bg-shape--line {
          border: none;
          border-radius: 2px;
          height: 2.5px !important;
          background: rgba(16, 185, 129, 0.4);
          transform: rotate(var(--rot, 45deg));
        }

        @keyframes bgFloat {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(var(--x-drift, 30px), var(--y-drift, -20px));
          }
          50% {
            transform: translate(calc(var(--x-drift, 30px) * -0.6), calc(var(--y-drift, -20px) * 1.2));
          }
          75% {
            transform: translate(calc(var(--x-drift, 30px) * 0.8), calc(var(--y-drift, -20px) * -0.5));
          }
        }

        @keyframes bgSpin {
          from { rotate: 0deg; }
          to { rotate: 360deg; }
        }
      `}</style>
    </div>
  );
}
