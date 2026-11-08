import Container from "@/components/containers";
import { SectionHeader } from "@/components/section-header";
import ProfileSection from "@/components/profile-section";
import About from "@/components/about";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import OpenSource from "@/components/open-source";
import GithubGraph from "@/components/githubgraph";
import Achievements from "@/components/achievements";
import GetInTouch from "@/components/get-in-touch";

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

        {/* PROFILE INTRODUCTION */}
        <ProfileSection />

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-6 -mx-2 md:-mx-14"></div>

        <About />
        <Skills />

        <SectionHeader title="Projects" id="projects-title" />
        <Projects />

        <Experience />
        <OpenSource />
        <GithubGraph />
        <Achievements />
        <Education />
        <GetInTouch />
      </Container>
    </div>
  );
}
