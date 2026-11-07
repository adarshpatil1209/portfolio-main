import React from "react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiGithubcopilot,
} from "react-icons/si";
import { FaCode } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { skillGroups } from "@/lib/profile";
import { SectionHeader, SectionNote } from "@/components/section-header";

const icons: Record<string, IconType> = {
  Python: SiPython,
  C: FaCode,
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
  Vercel: SiVercel,
  Figma: SiFigma,
  "GitHub Copilot": SiGithubcopilot,
};

export default function Skills() {
  return (
    <section id="skills" className="w-full mt-4 relative" aria-labelledby="skills-title">
      <SectionHeader title="Technical Skills" id="skills-title" />
      <SectionNote>The languages, tools and concepts I work with.</SectionNote>
      <div className="flex flex-col gap-6">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs uppercase tracking-widest font-custom2 text-neutral-500 dark:text-neutral-400 mb-2">
              {group.title}
            </h3>
            <ul className="flex flex-wrap items-center gap-2">
              {group.items.map((name) => {
                const Icon = icons[name];
                return (
                  <li
                    key={name}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-default"
                  >
                    {Icon && (
                      <Icon
                        className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
