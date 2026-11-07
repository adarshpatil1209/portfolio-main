import { profile } from "@/lib/profile";
import { SectionHeader } from "@/components/section-header";

export default function About() {
  return (
    <section id="about" className="w-full mt-4" aria-labelledby="about-title">
      <SectionHeader title="About" id="about-title" />
      <p className="font-custom2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl">
        {profile.about}
      </p>
      <ul className="flex flex-wrap gap-2 mt-5" aria-label="Interests">
        {profile.interests.map((item) => (
          <li
            key={item}
            className="px-2.5 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 text-xs font-medium text-neutral-700 dark:text-neutral-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
