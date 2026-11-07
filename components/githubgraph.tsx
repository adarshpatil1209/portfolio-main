"use client";

import { useEffect, useState, cloneElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";
import { profile } from "@/lib/profile";
import { SectionHeader, SectionNote } from "@/components/section-header";

const GithubGraph = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dark = resolvedTheme === "dark";

  return (
    <section id="github" className="w-full mt-4" aria-labelledby="github-title">
      <SectionHeader title="GitHub Activity" id="github-title" />
      <SectionNote>My contributions on GitHub over the past year.</SectionNote>

      <div className="w-full flex justify-center">
        <div className="flex w-full justify-center">
          {mounted && (
            <>
              <GitHubCalendar
                username={profile.githubUsername}
                colorScheme={dark ? "dark" : "light"}
                blockSize={isMobile ? 6 : 10}
                blockMargin={isMobile ? 2 : 3}
                fontSize={isMobile ? 10 : 12}
                style={{ color: dark ? "#e5e5e5" : "#171717" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderBlock={(block: any, activity: any) =>
                  cloneElement(block, {
                    "data-tooltip-id": "github-tooltip",
                    "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                  })
                }
              />
              <Tooltip
                id="github-tooltip"
                style={{
                  backgroundColor: dark ? "#171717" : "#ffffff",
                  color: dark ? "#e5e5e5" : "#171717",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  border: dark ? "1px solid #404040" : "1px solid #e5e5e5",
                  opacity: 1,
                }}
              />
            </>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 font-custom2">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-4"
        >
          View full profile on GitHub →
        </a>
      </p>
    </section>
  );
};

export default GithubGraph;
