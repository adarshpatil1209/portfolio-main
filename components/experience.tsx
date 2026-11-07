import { Sprout } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

export default function Experience() {
  return (
    <section id="experience" className="w-full mt-4" aria-labelledby="experience-title">
      <SectionHeader title="Experience" id="experience-title" />
      <div className="flex items-start gap-4 py-2">
        <div className="w-12 h-12 rounded-lg border border-neutral-200/80 dark:border-neutral-700 p-[2px] bg-neutral-50 dark:bg-neutral-900 shrink-0">
          <div className="w-full h-full rounded-md border border-neutral-200/60 dark:border-neutral-700/70 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
          </div>
        </div>
        <p className="font-custom2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border">
          At the beginning of my professional journey. Currently focused on building practical
          skills, developing real-world projects, exploring open-source contributions and growing
          as a developer.
        </p>
      </div>
    </section>
  );
}
