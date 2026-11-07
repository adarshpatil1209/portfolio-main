import { Hammer, BookOpen } from "lucide-react";
import { now } from "@/lib/profile";
import { SectionHeader, cardClass } from "@/components/section-header";

export default function Now() {
  return (
    <section id="now" className="w-full mt-4" aria-labelledby="now-title">
      <SectionHeader title="Currently Building & Learning" id="now-title" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={cardClass}>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-custom2 text-neutral-500 dark:text-neutral-400">
            <Hammer className="w-3.5 h-3.5" aria-hidden="true" />
            Building
          </div>
          {now.building.map((b) => (
            <div key={b.title} className="mt-2">
              <h3 className="font-semibold text-base text-neutral-950 dark:text-neutral-50">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 font-custom2">
                {b.description}
              </p>
            </div>
          ))}
        </div>
        <div className={cardClass}>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-custom2 text-neutral-500 dark:text-neutral-400">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            Learning
          </div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {now.learning.map((item) => (
              <li
                key={item}
                className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 text-xs font-medium text-neutral-700 dark:text-neutral-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
