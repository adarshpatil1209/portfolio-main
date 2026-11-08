import { profile } from "@/lib/profile";
import { SectionHeader } from "@/components/section-header";

export default function About() {
  return (
    <section id="about" className="w-full mt-4" aria-labelledby="about-title">
      <SectionHeader title="About" id="about-title" />
      <p className="font-custom2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl">
        {profile.about}
      </p>

    </section>
  );
}
