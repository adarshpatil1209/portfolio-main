import { Github, Linkedin, Mail } from "lucide-react";
import Container from "@/components/containers";
import { profile } from "@/lib/profile";
import { SectionHeader } from "@/components/section-header";
import About from "@/components/about";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import OpenSource from "@/components/open-source";
import GithubGraph from "@/components/githubgraph";
import Achievements from "@/components/achievements";
import GetInTouch from "@/components/get-in-touch";
import { SocialProfileCard } from "@/components/social-profile-card";

const socials = [
  { name: "GitHub", icon: Github, href: profile.github, external: true },
  { name: "LinkedIn", icon: Linkedin, href: profile.linkedin, external: true },
  { name: "Email", icon: Mail, href: `mailto:${profile.email}`, external: false },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="px-8 pt-24 md:p-20 md:pb-10 mx-auto">
        {/* RIGHT BORDER */}
        <div
          className="absolute right-0 top-0 h-full w-6 border-x border-x-(--pattern-fg)
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            bg-size-[10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        {/* LEFT BORDER */}
        <div
          className="absolute left-0 top-0 h-full w-6 border-x border-x-(--pattern-fg)
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            bg-size-[10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        {/* HERO */}
        <section id="hero" aria-label="Introduction">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
              <span className="link--elara">{profile.name}</span>
            </h1>

            <ul className="flex flex-wrap gap-4 sm:justify-end">
              {socials.map((social) => {
                const isGitHub = social.name === "GitHub";
                const isLinkedIn = social.name === "LinkedIn";

                const link = (
                  <a
                    href={social.href}
                    aria-label={social.name}
                    {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-neutral-900 dark:text-neutral-50 opacity-70 hover:opacity-100 transition block"
                  >
                    <social.icon size={20} aria-hidden="true" />
                  </a>
                );

                if (isGitHub || isLinkedIn) {
                  return (
                    <li key={social.name}>
                      <SocialProfileCard
                        type={isGitHub ? "github" : "linkedin"}
                        placement="bottom"
                        align="responsive-right"
                      >
                        {link}
                      </SocialProfileCard>
                    </li>
                  );
                }

                return (
                  <li key={social.name}>
                    {link}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="text-secondary font-custom2 text-s mt-1 text-neutral-700 dark:text-neutral-300">
            {profile.tagline.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-6 -mx-2 md:-mx-14"></div>

        <About />
        <Education />
        <Skills />

        <SectionHeader title="Projects" id="projects-title" />
        <Projects />

        <Experience />
        <OpenSource />
        <GithubGraph />
        <Achievements />
        <GetInTouch />
      </Container>
    </div>
  );
}
