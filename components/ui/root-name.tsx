"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface RootNode {
  x: number;
  y: number;
}

interface Branch {
  id: number;
  points: RootNode[];
  x: number;
  y: number;
  angle: number;
  speed: number;
  width: number;
  depth: number;
  life: number;
  maxLife: number;
  active: boolean;
  opacity: number;
  pulsePos: number;
  pulseActive: boolean;
  pulseSpeed: number;
  letterX: number;
}

interface RootNameProps {
  name: string;
  className?: string;
}

export default function RootName({ name, className = "" }: RootNameProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textMeasureRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted on client
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const textEl = textMeasureRef.current;
    if (!canvas || !textEl) return;

    let animId: number;
    let branches: Branch[] = [];
    let branchIdCounter = 0;
    const isDark = resolvedTheme === "dark";

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const prefersReducedMotion = reducedMotionQuery.matches;

    // Helper: spawn a seed root at a specific horizontal anchor in a letter
    const createSeedBranch = (
      startX: number,
      startY: number,
      baseAngle = -Math.PI / 2
    ): Branch => {
      // Natural organic angle spread around upward
      const angle = baseAngle + (Math.random() - 0.5) * 0.7;
      const speed = 0.35 + Math.random() * 0.45;
      const maxLife = 50 + Math.floor(Math.random() * 65);
      const width = 0.9 + Math.random() * 0.55;

      return {
        id: branchIdCounter++,
        points: [{ x: startX, y: startY }],
        x: startX,
        y: startY,
        angle,
        speed,
        width,
        depth: 0,
        life: 0,
        maxLife,
        active: true,
        opacity: 0.1,
        pulsePos: 0,
        pulseActive: Math.random() > 0.4,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        letterX: startX,
      };
    };

    const createChildBranch = (parent: Branch): Branch => {
      // Split off at 25deg - 50deg left or right
      const side = Math.random() > 0.5 ? 1 : -1;
      const angle = parent.angle + side * (0.4 + Math.random() * 0.45);
      const speed = parent.speed * (0.8 + Math.random() * 0.2);
      const maxLife = Math.floor(parent.maxLife * (0.45 + Math.random() * 0.35));
      const width = Math.max(0.5, parent.width * 0.7);

      return {
        id: branchIdCounter++,
        points: [{ x: parent.x, y: parent.y }],
        x: parent.x,
        y: parent.y,
        angle,
        speed,
        width,
        depth: parent.depth + 1,
        life: 0,
        maxLife,
        active: true,
        opacity: parent.opacity,
        pulsePos: 0,
        pulseActive: false,
        pulseSpeed: parent.pulseSpeed * 1.2,
        letterX: parent.letterX,
      };
    };

    const runSimulation = () => {
      const rect = textEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const computed = window.getComputedStyle(textEl);
      const fontSize = parseFloat(computed.fontSize) || 36;
      const fontWeight = computed.fontWeight || "bold";
      const fontFamily =
        computed.fontFamily || '"Instrument Serif", Georgia, serif';

      const dpr = window.devicePixelRatio || 1;
      const padding = 6;
      const width = rect.width + padding * 2;
      const height = rect.height + padding * 2;

      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);

      const fontString = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.font = fontString;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";

      const baselineY = height / 2;
      const startX = padding;

      // Identify letter positions across the text
      const anchors: { x: number; width: number }[] = [];
      for (let i = 0; i < name.length; i++) {
        if (name[i] === " ") continue;
        const prevW = ctx.measureText(name.substring(0, i)).width;
        const charW = ctx.measureText(name[i]).width;
        // Distribute 1 to 2 seed origins per letter
        anchors.push({ x: startX + prevW + charW * 0.25, width: charW });
        if (charW > fontSize * 0.4) {
          anchors.push({ x: startX + prevW + charW * 0.75, width: charW });
        }
      }

      // Initialize root system
      branches = [];
      const bottomY = baselineY + fontSize * 0.38;
      const topY = baselineY - fontSize * 0.42;

      anchors.forEach((anchor) => {
        // Start roots from the baseline of each letter
        branches.push(createSeedBranch(anchor.x, bottomY));
      });

      // If reduced motion, fast-forward to full growth and render once
      if (prefersReducedMotion) {
        for (let step = 0; step < 90; step++) {
          const newChildren: Branch[] = [];
          branches.forEach((b) => {
            if (b.active && b.life < b.maxLife) {
              b.life++;
              b.x += Math.cos(b.angle) * b.speed;
              b.y += Math.sin(b.angle) * b.speed;
              b.angle += (Math.random() - 0.5) * 0.2;
              b.points.push({ x: b.x, y: b.y });

              if (b.depth < 2 && Math.random() < 0.04 && b.life > 12) {
                newChildren.push(createChildBranch(b));
              }
            }
          });
          branches.push(...newChildren);
        }

        // Draw static
        ctx.clearRect(0, 0, width, height);

        // 1. Solid text base
        ctx.fillStyle = isDark ? "#fafafa" : "#171717";
        ctx.fillText(name, startX, baselineY);

        // 2. Strict text boundary clipping
        ctx.globalCompositeOperation = "source-atop";

        // 3. Draw roots
        branches.forEach((b) => {
          if (b.points.length < 2) return;
          ctx.beginPath();
          ctx.moveTo(b.points[0].x, b.points[0].y);
          for (let i = 1; i < b.points.length; i++) {
            ctx.lineTo(b.points[i].x, b.points[i].y);
          }
          ctx.strokeStyle = isDark
            ? "rgba(100, 100, 100, 0.75)"
            : "rgba(130, 130, 130, 0.75)";
          ctx.lineWidth = b.width;
          ctx.stroke();
        });

        ctx.globalCompositeOperation = "source-over";
        return;
      }

      // Continuous organic animation loop
      const render = () => {
        // 1. Clear frame
        ctx.clearRect(0, 0, width, height);

        // 2. Draw solid typography base
        ctx.fillStyle = isDark ? "#fafafa" : "#171717";
        ctx.fillText(name, startX, baselineY);

        // 3. Strict Masking: only pixels that hit the text will render
        ctx.globalCompositeOperation = "source-atop";

        // 4. Update and draw root branches
        const newBranches: Branch[] = [];

        // Colors
        const primaryColor = isDark
          ? "rgba(80, 80, 80,"
          : "rgba(130, 130, 130,";
        const secondaryColor = isDark
          ? "rgba(115, 115, 115,"
          : "rgba(165, 165, 165,";
        const pulseGlowColor = isDark
          ? "rgba(255, 255, 255,"
          : "rgba(235, 235, 235,";

        for (let i = 0; i < branches.length; i++) {
          const b = branches[i];

          // Fade in smoothly as it starts
          if (b.opacity < 0.85 && b.active) {
            b.opacity = Math.min(0.85, b.opacity + 0.035);
          }

          // Advance active growth
          if (b.active && b.life < b.maxLife) {
            b.life++;
            b.x += Math.cos(b.angle) * b.speed;
            b.y += Math.sin(b.angle) * b.speed;

            // Organic angle wander
            b.angle += (Math.random() - 0.5) * 0.22;

            // Gentle bias towards keeping growth inside vertical envelope
            if (b.y < topY) {
              b.angle += 0.2;
            } else if (b.y > bottomY) {
              b.angle -= 0.2;
            }

            b.points.push({ x: b.x, y: b.y });

            // Branching probability
            if (b.depth < 2 && Math.random() < 0.038 && b.life > 14) {
              newBranches.push(createChildBranch(b));
            }
          } else if (b.active && b.life >= b.maxLife) {
            b.active = false;
          }

          // Pulse animation along the branch
          if (b.pulseActive && b.points.length > 5) {
            b.pulsePos += b.pulseSpeed;
            if (b.pulsePos > 1) {
              // Reset pulse occasionally
              if (Math.random() < 0.08) {
                b.pulsePos = 0;
              } else {
                b.pulseActive = false;
              }
            }
          } else if (!b.pulseActive && Math.random() < 0.003) {
            // Wake up a pulse
            b.pulseActive = true;
            b.pulsePos = 0;
          }

          // Subtle regeneration: mature inactive branches slowly age and fade
          if (!b.active) {
            b.life++;
            if (b.life > b.maxLife + 250) {
              b.opacity -= 0.004;
            }
          }

          // Draw the branch path
          if (b.points.length > 1 && b.opacity > 0.01) {
            ctx.beginPath();
            ctx.moveTo(b.points[0].x, b.points[0].y);
            for (let j = 1; j < b.points.length; j++) {
              ctx.lineTo(b.points[j].x, b.points[j].y);
            }

            const baseColor = b.depth === 0 ? primaryColor : secondaryColor;
            ctx.strokeStyle = `${baseColor}${b.opacity})`;
            ctx.lineWidth = b.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Draw traveling light pulse along the root structure
            if (b.pulseActive && b.points.length > 4) {
              const pulseIdx = Math.min(
                b.points.length - 1,
                Math.floor(b.pulsePos * (b.points.length - 1))
              );
              const p = b.points[pulseIdx];
              if (p) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, b.width * 1.35, 0, Math.PI * 2);
                ctx.fillStyle = `${pulseGlowColor}${b.opacity * 0.95})`;
                ctx.fill();
              }
            }
          }
        }

        // Filter out expired branches and regenerate replacements
        branches = branches.filter((b) => b.opacity > 0.01);
        branches.push(...newBranches);

        // Keep root population healthy and continuous across all letters
        if (branches.length < anchors.length * 1.8) {
          const randomAnchor =
            anchors[Math.floor(Math.random() * anchors.length)];
          if (randomAnchor) {
            const startY =
              Math.random() > 0.5
                ? bottomY
                : baselineY + (Math.random() - 0.5) * fontSize * 0.3;
            branches.push(createSeedBranch(randomAnchor.x, startY));
          }
        }

        // 5. Restore composite operation
        ctx.globalCompositeOperation = "source-over";

        animId = requestAnimationFrame(render);
      };

      render();
    };

    // Ensure custom font is ready before measuring and starting canvas simulation
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        runSimulation();
      });
    } else {
      runSimulation();
    }

    // Responsive resize handler
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      runSimulation();
    });
    ro.observe(textEl);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [name, resolvedTheme, mounted]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none ${className}`}
    >
      {/* Invisible layout and accessibility anchor with exact typography */}
      <span
        ref={textMeasureRef}
        className="opacity-0 pointer-events-none select-none tracking-tight"
        aria-hidden="true"
      >
        {name}
      </span>

      {/* Screen reader text */}
      <span className="sr-only">{name}</span>

      {/* Living Typography Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute -top-[6px] -left-[6px] pointer-events-none"
      />
    </span>
  );
}

