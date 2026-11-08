"use client";

import React from "react";
import { FileText, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { profile } from "@/lib/profile";
import { SectionHeader } from "@/components/section-header";
import { SocialProfileCard } from "@/components/social-profile-card";

const buttons = [
  {
    label: "Resume",
    icon: FileText,
    href: "/Adarsh_Patil_Resume.pdf",
    download: true,
    external: false,
  },
  {
    label: "GitHub",
    icon: Github,
    href: profile.github,
    download: false,
    external: true,
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: profile.linkedin,
    download: false,
    external: true,
  },
  {
    label: "Email",
    icon: Mail,
    href: `mailto:${profile.email}`,
    download: false,
    external: false,
  },
  {
    label: "Contact",
    icon: MessageSquare,
    href: "/Contact",
    download: false,
    external: false,
  },
] as const;

export default function GetInTouch() {
  return (
    <div id="contact" className="w-full mt-4 mb-10 relative z-10">
      <SectionHeader title="Contact" id="contact-title" />

      {/* Button grid — 5 equal columns on md+, 2 columns on mobile (last button spans full width) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {buttons.map(({ label, icon: Icon, href, download, external }, index) => {
          const isGitHub = label === "GitHub";
          const isLinkedIn = label === "LinkedIn";

          const buttonElement = (
            <a
              key={label}
              href={href}
              {...(download ? { download: true } : {})}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`
                group flex items-center justify-center gap-2.5
                w-full h-full
                px-4 py-3
                rounded-xl
                border border-neutral-200 dark:border-neutral-800
                bg-white dark:bg-neutral-900
                text-neutral-700 dark:text-neutral-300
                text-sm font-medium font-custom2
                transition-all duration-200
                hover:border-neutral-300 dark:hover:border-neutral-700
                hover:bg-neutral-50 dark:hover:bg-neutral-800/80
                hover:text-neutral-900 dark:hover:text-neutral-100
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                ${!isGitHub && !isLinkedIn && index === buttons.length - 1 ? "col-span-2 md:col-span-1" : ""}
              `}
            >
              <Icon
                className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                aria-hidden="true"
              />
              <span>{label}</span>
            </a>
          );

          if (isGitHub || isLinkedIn) {
            return (
              <SocialProfileCard
                key={label}
                type={isGitHub ? "github" : "linkedin"}
                placement="top"
                align={isGitHub ? "responsive-right" : "responsive-left"}
                className={`w-full h-full flex ${
                  index === buttons.length - 1 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                {buttonElement}
              </SocialProfileCard>
            );
          }

          return buttonElement;
        })}
      </div>

      {/* Decorative grid pattern */}
      <div
        className="absolute -bottom-12 -right-2 md:-bottom-20 md:-right-14 w-80 h-40 -z-10 pointer-events-none opacity-60 dark:opacity-40"
        style={{
          maskImage: "radial-gradient(circle at bottom right, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom right, black, transparent 70%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] bg-right-bottom shadow-[inset_20px_20px_40px_rgba(255,255,255,0.8)] dark:shadow-[inset_20px_20px_40px_rgba(10,10,10,0.8)]"></div>
      </div>
    </div>
  );
}
