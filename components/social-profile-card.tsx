"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Users,
  FolderGit2,
  GraduationCap,
} from "lucide-react";
import { profile } from "@/lib/profile";

export interface SocialProfileCardProps {
  type: "github" | "linkedin";
  children: React.ReactNode;
  placement?: "top" | "bottom";
  align?: "center" | "left" | "right" | "responsive-left" | "responsive-right";
  className?: string;
}

export function SocialProfileCard({
  type,
  children,
  placement = "bottom",
  align = "center",
  className = "",
}: SocialProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
  }, [clearCloseTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearCloseTimeout();
    // 180ms delay provides a seamless bridge when moving mouse between trigger and card
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  }, [clearCloseTimeout]);

  // Touch device toggle support
  const handleTouchTrigger = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // If user is on a touch device, toggle preview without immediately navigating
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
  }, [isOpen]);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const isGitHub = type === "github";
  const profileUrl = isGitHub ? profile.github : profile.linkedin;
  const avatarSrc = isGitHub && !imgError
    ? "https://github.com/adarshpatil1209.png"
    : "/avatar.svg";

  // Alignment classes for desktop and mobile clamping
  const alignmentClasses =
    align === "left"
      ? "left-0"
      : align === "right"
      ? "right-0"
      : align === "responsive-left"
      ? "left-0 md:left-1/2 md:-translate-x-1/2"
      : align === "responsive-right"
      ? "right-0 md:left-1/2 md:-translate-x-1/2"
      : "left-1/2 -translate-x-1/2";

  const placementClasses =
    placement === "top" ? "bottom-full mb-2.5" : "top-full mt-2.5";

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleTouchTrigger}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: placement === "top" ? 6 : -6,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: placement === "top" ? 4 : -4,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`
              absolute z-50 pointer-events-auto
              w-[300px] max-w-[calc(100vw-2rem)]
              ${placementClasses}
              ${alignmentClasses}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="dialog"
            aria-label={`${isGitHub ? "GitHub" : "LinkedIn"} Profile Preview`}
          >
            {/* Invisible hover bridge to eliminate gap flickers */}
            <div
              className={`absolute inset-x-0 h-3 pointer-events-auto ${
                placement === "top" ? "-bottom-3" : "-top-3"
              }`}
              aria-hidden="true"
            />

            {/* Card Content Container */}
            <div
              className="
                relative overflow-hidden rounded-2xl
                border border-neutral-200 dark:border-neutral-800
                bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md
                shadow-[0_12px_36px_-6px_rgba(0,0,0,0.15),0_4px_16px_-2px_rgba(0,0,0,0.06)]
                dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]
                text-left font-custom2 transition-colors duration-200
              "
            >
              {/* Banner (Height: 56px) */}
              <div
                className={`
                  relative h-14 w-full overflow-hidden
                  ${
                    isGitHub
                      ? "bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800"
                      : "bg-gradient-to-r from-neutral-800 via-[#0a3055]/50 to-neutral-800"
                  }
                `}
              >
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]"
                  aria-hidden="true"
                />

                {/* Brand Badge in Top-Right */}
                <div className="absolute top-2.5 right-3 text-white/50 flex items-center gap-1">
                  {isGitHub ? (
                    <Github className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                  )}
                </div>
              </div>

              {/* Profile Avatar & Action Button Row */}
              <div className="relative px-3.5 -mt-6 flex items-end justify-between z-10">
                {/* Circular Profile Picture (48px) */}
                <div className="w-12 h-12 rounded-full ring-2 ring-white dark:ring-neutral-950 shadow-md bg-neutral-900 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarSrc}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                </div>

                {/* View Profile Action */}
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-1
                    px-2.5 py-1 rounded-full
                    border border-neutral-300 dark:border-neutral-700
                    bg-neutral-100 hover:bg-neutral-200
                    dark:bg-neutral-800/90 dark:hover:bg-neutral-700
                    text-neutral-800 dark:text-neutral-200
                    hover:text-neutral-950 dark:hover:text-white
                    text-[11px] font-medium font-custom2
                    transition-colors shadow-xs
                  "
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                </a>
              </div>

              {/* Profile Details */}
              <div className="px-3.5 pt-2 pb-3.5">
                {/* Name */}
                <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50 tracking-tight leading-snug">
                  {profile.name}
                </h3>

                {/* Handle or Headline */}
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono">
                  {isGitHub ? `@${profile.githubUsername}` : "B.Tech CSE (AI & ML) · KIT's CoE"}
                </p>

                {/* Concise Bio */}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2">
                  {isGitHub
                    ? "Developer interested in AI/ML, software development and open source."
                    : "Software development, AI/ML, and open-source contributor."}
                </p>

                {/* Divider */}
                <div className="w-full border-t border-neutral-100 dark:border-neutral-800/80 my-2.5" />

                {/* Metadata & Public Statistics */}
                {isGitHub ? (
                  <div className="flex items-center gap-3.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-neutral-800 dark:text-neutral-200">19</strong> repos
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-neutral-800 dark:text-neutral-200">2</strong> followers
                      </span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto truncate">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">Kolhapur</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <GraduationCap className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">KIT&apos;s College</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SocialProfileCard;
