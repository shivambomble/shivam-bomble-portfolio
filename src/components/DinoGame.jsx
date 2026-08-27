import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const W = 600;
const H = 300;
const GROUND_Y = H - 35;
const GRAVITY = 0.6;
const JUMP_FORCE = -11;
const BASE_SPEED = 4;

export default function DinoGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("idle");
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(() => {
    try { return parseInt(localStorage.getItem("dino-hi") || "0", 10); } catch { return 0; }
  });

  const gameRef = useRef(null);

  const initGame = useCallback(() => {
    gameRef.current = {
      running: true,
      dino: { x: 50, y: GROUND_Y, vy: 0, jumping: false, crouching: false },
      obstacles: [],
      particles: [],
      speed: BASE_SPEED,
      dist: 0,
      frame: 0,
      groundOffset: 0,
      cloudOffset: 0,
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const g = gameRef.current;
    if (!g) return;

    // Sky
    ctx.fillStyle = "#080c0a";
    ctx.fillRect(0, 0, W, H);

    // Clouds
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    const clouds = [80, 200, 350, 480];
    clouds.forEach((cx, i) => {
      const x = ((cx + g.cloudOffset * 0.3) % (W + 60)) - 30;
      const y = 25 + (i % 3) * 18;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.arc(x + 14, y - 4, 10, 0, Math.PI * 2);
      ctx.arc(x + 26, y, 14, 0, Math.PI * 2);
      ctx.fill();
    });

    // Ground line
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 14);
    ctx.lineTo(W, GROUND_Y + 14);
    ctx.stroke();

    // Ground dashes
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 20);
    ctx.lineTo(W, GROUND_Y + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dino body
    const d = g.dino;
    const dinoH = d.crouching ? 20 : 34;
    const dinoW = d.crouching ? 40 : 28;
    const dx = d.x;
    const dy = d.y - dinoH;

    // Body
    ctx.fillStyle = "#10b981";
    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.roundRect(dx, dy, dinoW, dinoH, 4);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Eye
    ctx.fillStyle = "#080c0a";
    ctx.beginPath();
    ctx.arc(dx + dinoW - 8, dy + 8, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlight
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(dx + dinoW - 7, dy + 7, 1, 0, Math.PI * 2);
    ctx.fill();

    // Mouth line
    ctx.strokeStyle = "#080c0a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(dx + dinoW - 4, dy + 14);
    ctx.lineTo(dx + dinoW + 4, dy + 14);
    ctx.stroke();

    // Legs (animated)
    if (!d.jumping && !d.crouching) {
      const legPhase = Math.floor(g.frame / 8) % 2;
      ctx.fillStyle = "#059669";
      if (legPhase === 0) {
        ctx.fillRect(dx + 4, GROUND_Y - 2, 5, 14);
        ctx.fillRect(dx + dinoW - 10, GROUND_Y - 8, 5, 8);
      } else {
        ctx.fillRect(dx + 4, GROUND_Y - 8, 5, 8);
        ctx.fillRect(dx + dinoW - 10, GROUND_Y - 2, 5, 14);
      }
    }

    // Obstacles (cacti)
    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 4;
    g.obstacles.forEach((obs) => {
      const ox = obs.x;
      const oy = GROUND_Y + 14 - obs.h;

      if (obs.type === 0) {
        // Single cactus
        ctx.fillRect(ox, oy, 8, obs.h);
        ctx.fillRect(ox - 4, oy + 6, 6, 3);
        ctx.fillRect(ox + 8, oy + 10, 6, 3);
      } else {
        // Double cactus
        ctx.fillRect(ox, oy, 8, obs.h);
        ctx.fillRect(ox + 14, oy + 4, 8, obs.h - 4);
        ctx.fillRect(ox + 6, oy + 4, 10, 3);
      }
    });
    ctx.shadowBlur = 0;

    // Particles
    g.particles.forEach((p) => {
      ctx.fillStyle = `rgba(16, 185, 129, ${p.life})`;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    // Score
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText(String(Math.floor(g.dist)).padStart(5, "0"), W - 12, 22);
  }, []);

  const tick = useCallback(() => {
    const g = gameRef.current;
    if (!g || !g.running) return;
    g.frame++;
    g.dist += g.speed * 0.02;
    g.groundOffset += g.speed;
    g.cloudOffset += g.speed;
    setScore(Math.floor(g.dist));

    // Dino physics
    const d = g.dino;
    if (d.jumping) {
      d.vy += GRAVITY;
      d.y += d.vy;
      if (d.y >= GROUND_Y) {
        d.y = GROUND_Y;
        d.vy = 0;
        d.jumping = false;
      }
    }

    // Speed increase
    g.speed = BASE_SPEED + Math.floor(g.dist / 20) * 0.3;

    // Spawn obstacles
    if (g.obstacles.length === 0 || g.obstacles[g.obstacles.length - 1].x < W - 200 - Math.random() * 150) {
      const h = 24 + Math.random() * 16;
      g.obstacles.push({ x: W, h, type: Math.random() > 0.5 ? 1 : 0 });
    }

    // Move obstacles
    g.obstacles.forEach((obs) => { obs.x -= g.speed; });
    g.obstacles = g.obstacles.filter((obs) => obs.x > -40);

    // Collision
    const dinoBox = {
      x: d.x + 4,
      y: d.y - (d.crouching ? 20 : 34) + 4,
      w: (d.crouching ? 40 : 28) - 8,
      h: (d.crouching ? 20 : 34) - 8,
    };

    for (const obs of g.obstacles) {
      const obsW = obs.type === 0 ? 8 : 22;
      const obsBox = { x: obs.x - 2, y: GROUND_Y + 14 - obs.h + 4, w: obsW + 4, h: obs.h - 8 };

      if (
        dinoBox.x < obsBox.x + obsBox.w &&
        dinoBox.x + dinoBox.w > obsBox.x &&
        dinoBox.y < obsBox.y + obsBox.h &&
        dinoBox.y + dinoBox.h > obsBox.y
      ) {
        // Hit particles
        for (let i = 0; i < 12; i++) {
          g.particles.push({
            x: d.x + 14,
            y: d.y - 17,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 1) * 4,
            life: 1,
            size: 2 + Math.random() * 3,
          });
        }
        g.running = false;
        setGameState("over");
        return;
      }
    }

    // Update particles
    g.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life -= 0.03;
    });
    g.particles = g.particles.filter((p) => p.life > 0);

    draw();
  }, [draw]);

  const loop = useCallback(() => {
    const g = gameRef.current;
    if (!g || !g.running) return;
    tick();
    // Check again after tick — tick may have set running=false on collision
    if (gameRef.current && gameRef.current.running) {
      requestAnimationFrame(loop);
    }
  }, [tick]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [gameState, loop]);

  // Draw idle state
  useEffect(() => {
    if (gameState === "idle") {
      initGame();
      draw();
    }
  }, [gameState, initGame, draw]);

  // Game over high score
  useEffect(() => {
    if (gameState === "over" && score > hiScore) {
      setHiScore(score);
      try { localStorage.setItem("dino-hi", String(score)); } catch {}
    }
  }, [gameState, score, hiScore]);

  // Controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameState === "over" && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        startGame();
        return;
      }
      if (gameState !== "playing") return;
      const g = gameRef.current;
      if (!g) return;
      if ((e.key === " " || e.key === "ArrowUp" || e.key === "w") && !g.dino.jumping) {
        e.preventDefault();
        g.dino.vy = JUMP_FORCE;
        g.dino.jumping = true;
        g.dino.crouching = false;
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        g.dino.crouching = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowDown" || e.key === "s") {
        const g = gameRef.current;
        if (g) g.dino.crouching = false;
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  const startGame = () => {
    initGame();
    setScore(0);
    setGameState("playing");
  };

  return (
    <div className="dg-section">
      <h2 className="dg-heading">
        <span className="dg-emoji">...</span>
        Dino Runner
      </h2>
      <p className="dg-sub">Space / Up to jump | Down to duck</p>

      <div className="dg-wrapper">
        <div className="dg-hud">
          <span className="dg-hud-item">HI {String(hiScore).padStart(5, "0")}</span>
          <span className="dg-hud-item dg-current">{String(score).padStart(5, "0")}</span>
        </div>

        <div className="dg-canvas-wrap">
          <canvas ref={canvasRef} width={W} height={H} className="dg-canvas" />

          {gameState === "idle" && (
            <div className="dg-overlay" onClick={startGame}>
              <motion.div
                className="dg-overlay-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="dg-overlay-text">Press SPACE to start</span>
              </motion.div>
            </div>
          )}

          {gameState === "over" && (
            <div className="dg-overlay" onClick={startGame}>
              <motion.div
                className="dg-overlay-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="dg-overlay-title">GAME OVER</span>
                <span className="dg-overlay-score">Score: {score}</span>
                <span className="dg-overlay-hint">Press SPACE to restart</span>
              </motion.div>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="dg-mobile">
          <button className="dg-mobile-btn" onTouchStart={() => {
            const g = gameRef.current;
            if (g && !g.dino.jumping) { g.dino.vy = JUMP_FORCE; g.dino.jumping = true; }
          }}>
            JUMP
          </button>
        </div>
      </div>

      <style>{`
        .dg-section { padding: 48px 0; text-align: center; }

        .dg-heading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          color: #f0fdf4;
          margin-bottom: 6px;
        }

        .dg-emoji { font-size: 1rem; color: rgba(255,255,255,0.2); font-family: monospace; }

        .dg-sub {
          color: rgba(255, 255, 255, 0.25);
          font-size: 0.82rem;
          margin-bottom: 20px;
        }

        .dg-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .dg-hud {
          display: flex;
          gap: 20px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.78rem;
        }

        .dg-hud-item { color: rgba(255,255,255,0.25); }
        .dg-current { color: rgba(255,255,255,0.5); }

        .dg-canvas-wrap {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
          max-width: 100%;
        }

        .dg-canvas {
          display: block;
          max-width: 100%;
          height: auto;
        }

        .dg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 12, 10, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .dg-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .dg-overlay-text {
          color: rgba(255,255,255,0.4);
          font-size: 0.85rem;
          font-family: "JetBrains Mono", monospace;
        }

        .dg-overlay-title {
          color: #ef4444;
          font-size: 1rem;
          font-weight: 700;
          font-family: "JetBrains Mono", monospace;
        }

        .dg-overlay-score {
          color: rgba(255,255,255,0.5);
          font-size: 0.82rem;
          font-family: "JetBrains Mono", monospace;
        }

        .dg-overlay-hint {
          color: rgba(255,255,255,0.25);
          font-size: 0.75rem;
          font-family: "JetBrains Mono", monospace;
        }

        .dg-mobile { display: none; }

        .dg-mobile-btn {
          padding: 12px 40px;
          border-radius: 8px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        @media (max-width: 640px) {
          .dg-mobile { display: block; margin-top: 8px; }
        }
      `}</style>
    </div>
  );
}
