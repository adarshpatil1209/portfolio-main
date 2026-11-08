"use client";

import React, { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import RootName from "@/components/ui/root-name";

export default function ProfileSection() {
  const [imgFailed, setImgFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imgFailed) return;

    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || !canHover || reducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const batman = new Image();
    batman.decoding = "async";
    batman.src = "/batman.jpg";

    let raf = 0;
    let looping = false;
    let hovering = false;
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let prevX = 0;
    let prevY = 0;
    let vx = 0;
    let vy = 0;
    let reveal = 0;
    let time = 0;

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
    };

    const drawCovered = (img: HTMLImageElement) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih || !cssW || !cssH) return;

      const imageRatio = iw / ih;
      const canvasRatio = cssW / cssH;
      let dw: number;
      let dh: number;
      let dx: number;
      let dy: number;

      if (imageRatio > canvasRatio) {
        dh = cssH;
        dw = cssH * imageRatio;
        dx = (cssW - dw) / 2;
        dy = 0;
      } else {
        dw = cssW;
        dh = cssW / imageRatio;
        dx = 0;
        dy = (cssH - dh) / 2;
      }

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const drawOrganicMask = (cx: number, cy: number, strength: number) => {
      const minSide = Math.min(cssW, cssH);
      const radius = minSide * 0.46 * strength;
      if (radius < 0.4) return;

      const speed = Math.min(Math.hypot(vx, vy), 16);
      const heading = Math.atan2(vy, vx);
      const stretch = Math.min(0.2, speed * 0.014);
      const blur = Math.max(5, minSide * 0.09);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(heading);
      ctx.scale(1 + stretch, 1 - stretch * 0.38);
      ctx.filter = `blur(${blur}px)`;

      const lobes = [
        { ox: 0, oy: 0, r: radius, a: 1 },
        {
          ox: Math.cos(time * 0.85) * radius * 0.2,
          oy: Math.sin(time * 1.12) * radius * 0.16,
          r: radius * 0.74,
          a: 0.92,
        },
        {
          ox: Math.cos(time * 0.52 + 1.8) * radius * 0.26,
          oy: Math.sin(time * 0.68 + 0.5) * radius * 0.2,
          r: radius * 0.58,
          a: 0.78,
        },
        {
          ox: Math.cos(time * 1.05 + 2.6) * radius * 0.14,
          oy: Math.sin(time * 0.9 + 1.1) * radius * 0.22,
          r: radius * 0.5,
          a: 0.7,
        },
        { ox: -speed * 0.45, oy: 0, r: radius * 0.52, a: 0.72 },
      ];

      for (const lobe of lobes) {
        const gradient = ctx.createRadialGradient(
          lobe.ox,
          lobe.oy,
          0,
          lobe.ox,
          lobe.oy,
          lobe.r,
        );
        gradient.addColorStop(0, `rgba(0,0,0,${lobe.a})`);
        gradient.addColorStop(0.38, `rgba(0,0,0,${lobe.a * 0.72})`);
        gradient.addColorStop(0.72, `rgba(0,0,0,${lobe.a * 0.22})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(lobe.ox, lobe.oy, lobe.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      ctx.filter = "none";
    };

    const frameLoop = () => {
      looping = true;
      time += 0.04;

      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      vx += x - prevX - vx * 0.78;
      vy += y - prevY - vy * 0.78;
      prevX = x;
      prevY = y;

      const targetReveal = hovering ? 1 : 0;
      reveal += (targetReveal - reveal) * (hovering ? 0.16 : 0.12);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      if (reveal > 0.012 && batman.naturalWidth) {
        ctx.save();
        drawOrganicMask(x, y, reveal);
        ctx.globalCompositeOperation = "source-in";
        ctx.globalAlpha = Math.min(1, reveal * 1.2);
        drawCovered(batman);
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }

      if (hovering || reveal > 0.012) {
        raf = requestAnimationFrame(frameLoop);
      } else {
        looping = false;
        ctx.clearRect(0, 0, cssW, cssH);
      }
    };

    const startLoop = () => {
      if (!looping) {
        raf = requestAnimationFrame(frameLoop);
      }
    };

    const pointerToLocal = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      targetX = Math.min(Math.max(event.clientX - rect.left, 0), cssW);
      targetY = Math.min(Math.max(event.clientY - rect.top, 0), cssH);
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerToLocal(event);
      x = targetX;
      y = targetY;
      prevX = x;
      prevY = y;
      vx = 0;
      vy = 0;
      hovering = true;
      startLoop();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerToLocal(event);
      if (!hovering) {
        hovering = true;
        x = targetX;
        y = targetY;
        prevX = x;
        prevY = y;
      }
      startLoop();
    };

    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      hovering = false;
      startLoop();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frame);

    batman.addEventListener("load", startLoop, { once: true });

    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      batman.removeEventListener("load", startLoop);
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
    };
  }, [imgFailed]);

  return (
    <section id="hero" aria-label="Profile Introduction" className="w-full">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Profile image with thin double border */}
        <div className="rounded-[1.4rem] border border-neutral-400/50 dark:border-neutral-500/40 p-[3px] shrink-0">
          <div
            ref={frameRef}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shadow-xs"
          >
            {!imgFailed ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full pointer-events-none"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center font-custom text-3xl sm:text-4xl text-neutral-800 dark:text-neutral-100 select-none">
                AP
              </div>
            )}
          </div>
        </div>

        {/* Name and Designation */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara inline-flex items-center">
              <RootName name={profile.name} />
            </span>
          </h1>
          <p className="text-sm sm:text-base font-medium font-custom2 text-neutral-600 dark:text-neutral-400 mt-1">
            AIML Student
          </p>
        </div>
      </div>
    </section>
  );
}